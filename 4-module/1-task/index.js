function makeFriendsList(friends) {
  // ваш код...
  const friendsList = document.createElement('ul');
  for (const name of friends) {
    const friendName = document.createElement('li');
    friendName.textContent = `${name.firstName} ${name.lastName}`;
    friendsList.append(friendName);
  }
  return friendsList;
}
