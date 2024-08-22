import { React, useEffect, useState } from "react";
import { View, Text, Heading, Center, NativeBaseProvider } from "native-base";
import axios from "axios";

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://10.0.0.140:8000/test");

        if (!response.ok) {
          // The server responded with a status code outside the 2xx range
          throw new Error(
            `Error response: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        if (
          error.name === "TypeError" &&
          !error.message.includes("Error response")
        ) {
          // The request was made but no response was received
          console.log("Error request:", error.message);
        } else {
          // Something happened in setting up the request or in the response that triggered an error
          console.log("Error message:", error.message);
        }
      }
    };
    getData();
  }, []);

  const Example = () => {
    return (
      <View>
        <Heading>
          Bank!
          <Heading color="emerald.400"></Heading>
        </Heading>
        <Text pt="3">
          {data.Name}: {data.AccountBalance}
        </Text>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
