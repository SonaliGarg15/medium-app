import Vue from "vue";
import ArticleActions from "@/components/ArticleActions.vue";

describe("Settings.test.js", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(ArticleActions); // Create a copy of the original component
    vm = new cmp({
      name: "ArticleActions",
      propsData: {
        // Replace data value with this fake data
        article: {author: "sonali", favorited: true},
        isAuthor: true
      }
    }).$mount(); // Instances and mounts the component
  });

  it('equals isAuthor to true', () => {
   expect(vm.isAuthor).toBeTruthy(); 
  });

  it('verifies that the favorite article label is Unfavorite Article', () => {
    expect(vm.favoriteArticleLabel).toBe("Unfavorite Article");  
   });
});