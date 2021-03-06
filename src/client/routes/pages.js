export const PAGES = {
  home: {
    name: 'home',
    path: '/'
  },
  page404: {
    name: 'page404',
    path: '/page404'
  },
  users: {
    teachers: {
      name: 'teachers',
      path: '/users/teachers'
    },
    students: {
      name: 'students',
      path: '/users/students'
    },
    user: {
      name: 'user',
      path: '/users/:id',
      call: id => `/users/${id}`
    }
  },
  chat: {
    name: 'chat',
    path: '/chat'
  },
  login: {
    name: 'login',
    path: '/login'
  },
  signup: {
    name: 'signup',
    path: '/signup'
  },
  about: {
    name: 'about',
    path: '/about'
  },
  feedback: {
    name: 'feedback',
    path: '/feedback'
  },
  profile: {
    name: 'profile',
    path: '/profile'
  },
  API: {
    postLogin: {
      name: 'postLogin',
      path: '/api/login'
    }
  }
};
