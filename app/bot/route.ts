export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { Bot, webhookCallback } from 'grammy'
import  prisma  from '@/lib/prisma' // adjust the path if needed

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token)
bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to Elora! Use /categories to get started. use /comment to give  a comment or feedback.')
})
// /categories command (existing functionality)
bot.command('categories', async (ctx) => {
  try {
    // Get all root categories (those with no parent)
    const rootCategories = await prisma.category.findMany({
      where: { parentId: null },
      include: { tgAccounts: true, children: true },
    })
    
    if (rootCategories.length === 0) {
      return ctx.reply("No categories available.")
    }
    
    // Build an inline keyboard with one button per root category.
    const keyboard = rootCategories.map(category => [
      { text: category.name, callback_data: `category|${category.id}` }
    ])
    
    await ctx.reply("Select a category:", {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    })
  } catch (error) {
    console.error('Error in /categories command:', error)
    await ctx.reply("There was an error fetching categories.")
  }
})

// /comment command: accepts new comments from the user
bot.command('comment', async (ctx) => {
  try {
    // Extract the comment text (everything after the command)
    const text = ctx.message?.text || ''
    const parts = text.split(' ')
    parts.shift() // remove the command "/comment"
    const commentContent = parts.join(' ').trim()
    
    if (!commentContent) {
      return ctx.reply("Please provide a comment after the command. For example:\n\n/comment This is my comment.")
    }
    
    // Get the username from the sender; fall back to first_name or "anonymous"
    const username =
      ctx.message?.from.username ||
      ctx.message?.from.first_name ||
      "anonymous"
    
    // Create the new comment record
    const comment = await prisma.comment.create({
      data: {
        content: commentContent,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: username,
      },
    })
    
    await ctx.reply(`Your comment has been added:\n\n"${comment.content}"`)
  } catch (error) {
    console.error("Error adding comment:", error)
    await ctx.reply("There was an error adding your comment.")
  }
})

// Callback query handler for categories, accounts, etc.
bot.on('callback_query:data', async (ctx) => {
  const data = ctx.callbackQuery.data || ''
  
  // Category callback: show children and TGAccounts inline
  if (data.startsWith('category|')) {
    const categoryId = data.split('|')[1]
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { children: true, tgAccounts: true },
    })
    if (!category) {
      return ctx.answerCallbackQuery({ text: "Category not found." })
    }
    
    const inlineKeyboard = []
    
    if (category.children && category.children.length > 0) {
      const subcatButtons = category.children.map(subcat => ({
        text: subcat.name,
        callback_data: `category|${subcat.id}`,
      }))
      inlineKeyboard.push(subcatButtons)
    }
    
    if (category.tgAccounts && category.tgAccounts.length > 0) {
      const accountButtons = category.tgAccounts.map(account => ({
        text: account.username,
        callback_data: `account|${account.id}`,
      }))
      inlineKeyboard.push(accountButtons)
    }
    
    await ctx.editMessageText(`Category: ${category.name}`, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    })
    return ctx.answerCallbackQuery()
  }
  
  // Account callback: display account's username in a notification.
  if (data.startsWith('account|')) {
    const accountId = data.split('|')[1]
    const account = await prisma.tGAccount.findUnique({
      where: { id: accountId },
    })
    if (!account) {
      return ctx.answerCallbackQuery({ text: "Account not found." })
    }
    return ctx.answerCallbackQuery({ text: `Account: @${account.username}` })
  }
})

// Fallback: echo back text messages
bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text)
})

export const POST = webhookCallback(bot, 'std/http')
