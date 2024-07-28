module.exports = {
    preset: 'jest-expo',
    testPathIgnorePatterns: ["dist/src/firebase", "./node_modules"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    // transformIgnorePatterns: [
    //     "node_modules/(?!(react-native|@react-native|@react-native-firebase)/)"
    // ],
};