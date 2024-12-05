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
      <Card.Cover style={styles.image} source={avatar} />
      <Card.Content style={styles.content}>
        <Text style={{color: "#d3d3d3"}} variant="bodyLarge">From: {country} </Text>
        <Text style={{color: "#d3d3d3"}} variant="bodyLarge">Email: {email}</Text>
        <Text style={styles.choose}>{` - ${name} - `} ⬆️</Text>
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
    backgroundColor: "#2C3E50",
    borderWidth: 2,
    borderColor: "#BDC3C7", 
  },
  image: {
    width: 200,
    height: 170,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    resizeMode: "cover",
  },
  content: {
    marginTop: 10,
    fontSize: 20
  },
  choose: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "#FFC567"
  },
});
