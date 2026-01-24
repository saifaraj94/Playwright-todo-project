import { test, expect } from '@playwright/test';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

test('should be able to add todo', async ({page, request, context}) => {
    const user = new User();
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingTheAPI(user);
    const newTodoPage= new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask('playwright');
    const todoPage = new TodoPage(page);
    const todoText = await todoPage.getTodoTextByIndex(0);
    expect(todoText).toEqual('playwright');
});

test("should be able to delete a todo", async ({page, request, context})=> {

    const user = new User();
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingTheAPI(user);
    const newTodoPage = new NewTodoPage(page, request);
    await newTodoPage.addNewTaskUsingAPi(user);
    const todoPage = new TodoPage(page);
    await todoPage.load();
    await todoPage.deleteTodoByIndex(0);
    const noTodosMessage = todoPage.getNotodosMessage();
    await expect(noTodosMessage).toBeVisible();

});