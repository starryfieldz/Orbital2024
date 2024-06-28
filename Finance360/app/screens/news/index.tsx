// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// import axios from 'axios';
// import NavigationTab from '../../../components/navigation/navigation';

// const News = ({ navigation }) => {
//   const [newsArticles, setNewsArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get('https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=b4ee4af9b9c64710be2504dbceaeb049', {
//         });
//         setNewsArticles(response.data.articles || []);
//       } catch (error) {
//         console.error('Error fetching financial news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   const openArticle = (url) => {
//     Linking.openURL(url).catch(err => console.error('An error occurred', err));
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text style={styles.header}>Financial News</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         {newsArticles.map((article, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.articleContainer}
//             onPress={() => openArticle(article.url)}
//           >
//             <Text style={styles.articleTitle}>{article.title}</Text>
//             <Text style={styles.articleDescription}>{article.description}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <View style={styles.navigationTab}>
//         <NavigationTab navigation={navigation} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   articleContainer: {
//     marginBottom: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   articleTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   articleDescription: {
//     fontSize: 14,
//   },
//   navigationTab: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// export default News;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import NavigationTab from '../../../components/navigation/navigation';

const News = ({ navigation }) => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: 'business',
            apiKey: 'b4ee4af9b9c64710be2504dbceaeb049',
            language: "en",
          },
        });
        setNewsArticles(response.data.articles || []);
      } catch (error) {
        console.error('Error fetching financial news:', error);
      }
    };

    fetchNews();
  }, []);

  const openArticle = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Financial News</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {newsArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleContainer}
            onPress={() => openArticle(article.url)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  articleContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default News;


