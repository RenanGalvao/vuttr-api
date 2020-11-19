import User from '../interfaces/usersInterface';


export default {

  render(user: User | null){
    let viewObj = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
    } as User;

    return viewObj;
  },

  renderMany(users: User[]){
    return users.map(user => this.render(user));
  }
};