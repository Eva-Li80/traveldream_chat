import * as React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

type UserCardProps = {
  name: string;
  email: string;
  avatar: any;
  country: string;
};

const UserCard = ({ name, email, avatar, country }: UserCardProps) => (
  <>
    <Card style={styles.card}>
      <Card.Title title={`- ${name} - `} />
      <Card.Cover style={styles.image} source={avatar} />
      <Card.Content style={styles.content}>
        <Text variant="bodyLarge">From: {country} </Text>
        <Text variant="bodyLarge">Email: {email}</Text>
        <Text style={styles.choose}>Choose {name} ⬆️</Text>
      </Card.Content>
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
    minWidth: 300,
    padding: 10,
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "orange",
  },
  image: {
    width: 200,
    height: 170,
  },
  content: {
    marginTop: 10,
    fontSize: 20
  },
  choose: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20
  },
});
