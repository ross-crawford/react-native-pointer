import TeamItem from '@/components/TeamItem';
import { useAuth } from '@/context/auth-context';
import { teams } from '@/lib/appwrite';
import { toast } from '@/lib/toast';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { ID } from 'react-native-appwrite';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

const TeamsScreen = () => {
  const [createTeamName, setCreateTeamName] = useState<string>('');
  const [createTeamError, setCreateTeamError] = useState<string | null>(null);
  const [joinTeamName, setJoinTeamName] = useState<string>('');
  const [joinTeamError, setJoinTeamError] = useState<string | null>(null);

  const { user, teamList } = useAuth();

  const handleCreateTeam = async () => {
    if (!createTeamName.trim()) {
      setCreateTeamError('Please enter a team name.');
      return;
    }
    setCreateTeamError(null);
    setCreateTeamName('');
    const result = await teams.create(ID.unique(), createTeamName);
    console.log(result);
    toast('Team created successfully!');
  };

  const handleJoinTeam = async () => {
    if (!joinTeamName.trim()) {
      setJoinTeamError('Please enter a team code.');
      return;
    }
    const result = await teams.createMembership(
      '683ecd830018871fe9f8',
      ['member'],
      undefined,
      user?.$id,
      undefined,
      'http://localhost:8081/teams'
    );
    console.log(result);
    setJoinTeamError(null);
    setJoinTeamName('');
    toast('Team joined successfully!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Create team */}
      <View style={styles.content}>
        <Text style={styles.title} variant="titleLarge">
          Create a team
        </Text>
        <TextInput
          style={styles.field}
          aria-label="Team name"
          placeholder="Team name"
          keyboardType="default"
          mode="outlined"
          onChangeText={setCreateTeamName}
          value={createTeamName}
          error={!!createTeamError}
        />
        <HelperText type="error" visible={!!createTeamError}>
          {createTeamError}
        </HelperText>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleCreateTeam}
        >
          Create team
        </Button>
      </View>

      {/* Join team */}
      <View style={styles.content}>
        <Text style={styles.title} variant="titleLarge">
          Join a team
        </Text>
        <TextInput
          style={styles.field}
          aria-label="Team code"
          placeholder="Team code"
          keyboardType="default"
          mode="outlined"
          onChangeText={setJoinTeamName}
          value={joinTeamName}
          error={!!joinTeamError}
        />
        <HelperText type="error" visible={!!joinTeamError}>
          {joinTeamError}
        </HelperText>
        <Button style={styles.button} mode="contained" onPress={handleJoinTeam}>
          Join team
        </Button>
      </View>

      {/* Your teams */}
      <View style={styles.content}>
        <Text style={styles.title} variant="titleLarge">
          Your teams
        </Text>
        <FlatList
          data={teamList}
          keyExtractor={(team) => team.$id}
          renderItem={({ item: team }) => (
            <TeamItem
              onPress={() => toast(`This is ${team.name}`)}
              teamName={team.name}
              teamMembers={team.total}
            />
          )}
          ListEmptyComponent={
            <Text>No teams found. Create or join a team to get started.</Text>
          }
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: '100%', flex: 1, marginBottom: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  content: {
    padding: 16,
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  field: {
    width: '100%',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
});

export default TeamsScreen;
