function getAnswer(userText) {
  userText = userText.toLowerCase();
  for (let item of knowledgeBase) {
    for (let key of item.keywords) {
      if (userText.includes(key)) {
        return item;
      }
    }
  }
  return { answer: "Zerotoin is learning this topic 😊", image: null };
}
