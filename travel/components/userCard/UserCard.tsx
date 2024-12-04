import * as React from "react";
import { Card, Text ,} from "react-native-paper";
import { StyleSheet } from 'react-native'

type UserCardProps = {
  name: string;
  email: string;
  avatar: any;
  country: string;
};

const UserCard = ({ name, email, avatar, country}: UserCardProps) => (
  <>
    <Card style={styles.card}>
      <Card.Title title={name} />
      <Card.Cover style={styles.image} source={avatar} />
      <Card.Content>
        <Text variant="bodyMedium">{name} har {email} {country} färg</Text>
      </Card.Content>
       <Text>Se mina inlägg 👋 🥰 ⬆️</Text>
    </Card>
  </>
);

export default UserCard;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    padding: 20
   
  },
  image: {
    width:  200,
    height: 200, 
  },
});

