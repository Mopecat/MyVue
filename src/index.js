import MyVue from "./myVue";

const vm = new MyVue(
  {
    el: "#app",
    data: {
      name: "啦啦啦啦啦"
    }
  },
  "name"
);

vm.$data.name = "hello world";
