import { toast } from '@/lib/toast';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Current team */}
      <View style={styles.content}>
        <Text style={styles.title} variant="titleLarge">
          Current Team
        </Text>
        <Text style={styles.field} variant="bodyMedium">
          Team Alpha
        </Text>
        <Text style={styles.field} variant="bodySmall">
          Members: Alice, Bob, Charlie
        </Text>
      </View>

      {/* Actions */}
      <View>
        <Text variant="titleLarge">Actions</Text>
        <View>
          <Button mode="contained" onPress={() => toast('Create a new team')}>
            Create Team
          </Button>
          <Button
            mode="outlined"
            onPress={() => toast('Join an existing team')}
          >
            Join Team
          </Button>
        </View>
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

export default HomeScreen;
