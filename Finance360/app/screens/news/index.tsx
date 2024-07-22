import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, TextInput, Button } from 'react-native';
import axios from 'axios';
import NavigationTab from '../../../components/navigation/navigation';
import Colors from '@/constants/Colors';

const News = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [country, setCountry] = useState('us'); // default to US news
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: country,
            category: 'business',
            apiKey: 'b4ee4af9b9c64710be2504dbceaeb049',
          },
        });
        setNewsArticles(response.data.articles || []);
      } catch (error) {
        console.error('Error fetching financial news:', error);
      }
    };

    fetchNews();
  }, [country]); // fetch news whenever the country changes

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResult([]);
      return;
    }

    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: searchQuery,
          apiKey: 'b4ee4af9b9c64710be2504dbceaeb049',
        },
      });
      setSearchResult(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const openArticle = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const convertToSGT = (utcDate) => {
    const date = new Date(utcDate);
    const offset = 8 * 60; // Singapore is UTC+8
    const sgtDate = new Date(date.getTime() + offset * 60 * 1000);
    return sgtDate.toLocaleString(); // or any desired format
  };

  const combinedArticles = searchResult.length > 0 ? searchResult : newsArticles;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Financial News</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, country === 'us' && styles.activeButton]}
            onPress={() => setCountry('us')}
          >
            <Text style={[styles.buttonText, country === 'us' && styles.activeButtonText]}>USA News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, country === 'sg' && styles.activeButton]}
            onPress={() => setCountry('sg')}
          >
            <Text style={[styles.buttonText, country === 'sg' && styles.activeButtonText]}>SG News</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for news"
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              if (text.trim() === '') {
                setSearchResult([]);
              }
            }}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {combinedArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleContainer}
            onPress={() => openArticle(article.url)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
            <Text style={styles.articleDate}>{convertToSGT(article.publishedAt)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigationTab}>
        <NavigationTab navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orangeBG,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    backgroundColor: Colors.mainBG,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.mainBG,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#ff8c00', // Darker shade for active button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeButtonText: {
    color: 'white', // Change text color for active button
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 70,
  },
  articleContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: Colors.mainBG,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
  },
  articleDate: {
    fontSize: 12,
    color: '#888',
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default News;
