import Vue from "vue";
import ArticleMeta from "@/components/ArticleMeta.vue";

describe("ArticleMeta.spec.js", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(ArticleMeta); // Create a copy of the original component
    vm = new cmp({
      name: "ArticleMeta",
      propsData: {
        // Replace data value with this fake data
        article: { author: {username : "sonali"} ,favorited: true}
      }
    }).$mount(); // Instances and mounts the component
  });

  it('verifies the default value as false', () => {
   expect(vm.actions).toBeFalsy(); 
  });

  it('verifies the value passed to article', () => {
    expect(vm.article.favorited).toBeTruthy(); 
   });
});