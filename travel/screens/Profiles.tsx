import { View, ScrollView, Pressable , StyleSheet} from 'react-native';
import { useSelector} from 'react-redux';
import { RootState } from '../redux/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import UserCard from '../components/userCard/UserCard';
import imageMapping from '../utils/ImgMapping';


type ProfilesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profiles'>;

type Props = {
  navigation: ProfilesNavigationProp;
};

const Profiles = ({ navigation }: Props) => {
  const {users} = useSelector((state: RootState) => state.users);


  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map((user) => (
          <Pressable
            key={user.id}
            onPress={() => {
              navigation.navigate('Profile', {user});
            }}
          >
            <UserCard name={user.name} email={user.email} avatar={imageMapping[user.avatar]} country={user.country}/>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 40
  },
  monsterImage: {
    marginTop: 50,
    width: "100%", 
    height: 300, 
    resizeMode: "contain", 
    marginBottom: 50,
  },
});

export default Profiles;



