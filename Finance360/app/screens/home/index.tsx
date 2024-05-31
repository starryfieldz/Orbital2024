import Title from "./components/title";
import {View} from 'react-native';
import Month from "./components/month";
import Chart from "./components/chart";
import NavigationTab from "../../../components/navigation/navigation";

const Home = () => {
    const food = 30;
    const necessity = 20;
    const clothes = 25;
    const subscriptions = 25;
    const userName = "Admin";
    
    return (
        <View>
            <Title name = {userName} />
            <Month />
            <Chart food={food} necessity={necessity} clothes={clothes} subscriptions={subscriptions} />
            <NavigationTab />
        </View>
    );
};

export default Home;