import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type TeamItemsProps = {
  onPress: () => void;
  teamName: string;
  teamMembers: string[];
};

const TeamItem = ({ onPress, teamName, teamMembers }: TeamItemsProps) => {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.textContainer}>
        <Text variant="bodyMedium" style={styles.teamName}>
          {teamName}
        </Text>
        <Text variant="bodySmall" style={styles.teamMembersCount}>
          {teamMembers.length} members
        </Text>
      </View>
      <View>
        <Ionicons name="arrow-forward-sharp" size={24} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamMembersCount: {
    fontSize: 12,
    color: '#666',
  },
});

export default TeamItem;
