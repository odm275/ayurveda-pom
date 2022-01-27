import { objectType } from 'nexus';
import { Resolver } from "type-graphql"; 




export const Task = objectType({
  name: 'Task',
  definition(t){
    t.id("id");
    t.string("title");
    t.int("amt");
    t.string("user");
    t.boolean("isNew");
    t.boolean("isFinished");
    t.string("category")
  }
});