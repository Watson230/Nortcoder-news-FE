const API_URL= 'https://damp-everglades-92072.herokuapp.com/api';


const getTopics =()=>{
  return fetch(`${API_URL}/topics`)
    .then(res =>{
      return res.json();
    });
};

const getTopicsArticles =()=>{
  return fetch(`${API_URL}/topics/articles`)
    .then(res =>{
      return res.json();
    });
};

const getArticles=()=>{
  return fetch(`${API_URL}/articles`)
    .then(res =>{
      return res.json();
    });
};

const getMostPopularArticles=()=>{
  return fetch(`${API_URL}/articles/mostPopular`)
    .then(res =>{
      return res.json();
    });
};

const getArticleByID=(articleId)=>{
  return fetch(`${API_URL}/articles/${articleId}`)
    .then(res =>{
      return res.json();
    });
};

const getArticleComments=(articleId)=>{
  return fetch(`${API_URL}/articles/${articleId}/comments`)
    .then(res =>{
      return res.json();
    });
};

const postComment = (articleId, comment) => {
  return fetch(`${API_URL}/articles/${articleId}/comments`, 
    {method: 'POST', headers: new Headers({'Content-Type': 'application/json'})
      ,body: JSON.stringify({comment})})
    .then(res => {
      return res.json();
    });
};

const voteArticle = (articleId, vote) => {
  return fetch(`${API_URL}/articles/${articleId}?vote=${vote}`, {method: 'PUT'})
    .then(res => {
      return res.json();
    });
};

const getUsers =()=>{
    return fetch(`${API_URL}/users`)
      .then(res =>{
        return res.json();
      });
  };

  const getUsers =(userName)=>{
    return fetch(`${API_URL}/users/${userName}`)
      .then(res =>{
        return res.json();
      });
  };

  const getUsersArticles =(userName)=>{
    return fetch(`${API_URL}/users/${userName}/articles`)
      .then(res =>{
        return res.json();
      });
  };

  const getUsersComments=(userName)=>{
    return fetch(`${API_URL}/users/${userName}/comments`)
      .then(res =>{
        return res.json();
      });
  };

  const voteComment = (commentId, vote) => {
    return fetch(`${API_URL}/comments/${commentId}?vote=${vote}`, {method: 'PUT'})
      .then(res => {
        return res.json();
      });
  };
  const voteComment = (commentId, vote) => {
    return fetch(`${API_URL}/comments/${commentId}?vote=${vote}`, {method: 'PUT'})
      .then(res => {
        return res.json();
      });
  };

  const deleteComment = (commentId) => {
    return fetch(`${API_URL}/comments/${commentId}`, {method: 'DELETE'})
      .then(res => {
        return res.json();
      });
  };
