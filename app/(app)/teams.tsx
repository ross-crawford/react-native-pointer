import TeamItem from '@/components/TeamItem';
import { toast } from '@/lib/toast';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

const teams = [
  {
    id: '1',
    name: 'Team Alpha',
    members: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: '2',
    name: 'Team Beta',
    members: ['David', 'Eve', 'Frank'],
  },
  {
    id: '3',
    name: 'Team Gamma',
    members: ['Grace', 'Heidi', 'Ivan'],
  },
];

const TeamsScreen = () => {
  const [createTeamName, setCreateTeamName] = useState<string>('');
  const [createTeamError, setCreateTeamError] = useState<string | null>(null);
  const [joinTeamName, setJoinTeamName] = useState<string>('');
  const [joinTeamError, setJoinTeamError] = useState<string | null>(null);

  const handleCreateTeam = () => {
    if (!createTeamName.trim()) {
      setCreateTeamError('Please enter a team name.');
      return;
    }
    setCreateTeamError(null);
    setCreateTeamName('');
    toast('Team created successfully!');
  };

  const handleJoinTeam = () => {
    if (!joinTeamName.trim()) {
      setJoinTeamError('Please enter a team code.');
      return;
    }
    setJoinTeamError(null);
    setJoinTeamName('');
    toast('Team joined successfully!');
  };

  return (
    <View style={styles.container}>
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
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TeamItem
              onPress={() => toast(`This is ${item.name}`)}
              teamName={item.name}
              teamMembers={item.members}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  content: {
    // flex: 1,
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
    backgroundColor: '#6200ee',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
});

export default TeamsScreen;
