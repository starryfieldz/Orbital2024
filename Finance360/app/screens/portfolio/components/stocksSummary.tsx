const Admin = () => {
    const [userStocks, setUserStocks] = useState(["AAPL"]);

  const openTradingViewChart = (symbol) => {
    const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;
    Linking.openURL(tradingViewUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.stockItem} onPress={() => openTradingViewChart(item)}>
      <Text style={styles.stockText}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Stocks</Text>
      <FlatList
        data={userStocks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};