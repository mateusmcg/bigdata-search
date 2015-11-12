# bigdata-search

Search for hashtags to get information about what is being discussed about that topic.
- Built with [AngularJS](https://angularjs.org/)

## DEMO 
- [Live Demo](http://mateusmcg.github.io/bigdata-search/) (outdated - Updates comming soon).

## API's
- [GooglePlus](https://console.developers.google.com)
- [Instagram](https://instagram.com/developer/)

## Main Object
- We intend to manipulate the API data and analyse the posts to see their sentiment (Good/Bad/Neutral post).

## How to Use
- First step is to tell us what topic are you looking for by typing a hashtag at the top of the brower and specify how many posts you want in return about that specific subject.
 
- Secondly we will analyse the data and try to guess its sentiment with the most accuracy possible. This analyse is made by a few steps:
  - Remove [stopwords](https://pt.wikipedia.org/wiki/Palavra_vazia) from each post.
  - Remove accentuation and special characters.
  - Analyse its positivity by a pre-populated list of words with a specific score.
  - Analyse its negativity by the same way above.
  - And finally compare the positivity with the negativity to obtain the post sentiment.
 
- After that we use the words we analysed to create a few metrics such as:
  - Number of Good posts (%).
  - Number of Bad posts (%).
  - Number of Neutral posts (%).
  - Total numbers of words.
  - Ranking of the Top 10 most used words.
