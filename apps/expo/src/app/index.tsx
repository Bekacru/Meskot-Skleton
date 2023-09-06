import { View, Text } from "react-native";
import { api } from "~/utils/trpc";

export default function Index(){
    const {data} = api.item.all.useQuery()
    console.log(data)
    return (
        <View>
            {data?.map(item=>(
                <Text key={item.id}>
                    {item.name}
                </Text>
            ))}
        </View>
    )
}