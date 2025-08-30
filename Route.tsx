import { createStackNavigator } from "react-navigation-stack";
import HomePages from "./src/pages/home";




const AppNavigator = createStackNavigator({
    Home:HomePages
})

export  default AppNavigator