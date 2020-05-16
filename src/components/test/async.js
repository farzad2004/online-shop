const myAsyncFunction = async () => {
  try {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = await userResponse.json();
    const secondUser = users[1];

    console.log(secondUser);
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + secondUser.id
    );
    const posts = await postResponse.json();
    console.log(posts);
  } catch (err) {
    console.log("there was an error");
  }
};
