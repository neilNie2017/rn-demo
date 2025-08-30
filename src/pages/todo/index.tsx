import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  SectionList,
  Platform,
} from 'react-native';
import Container from '../../layout/Container';

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface MessageItem {
  id: string;
  title: string;
  content: string;
  read: boolean;
  timestamp: Date;
  type: 'info' | 'warning' | 'success';
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: '完成React Native项目',
      description: '实现待办事项功能',
      completed: false,
      createdAt: new Date(),
      priority: 'high',
    },
    {
      id: '2',
      title: '学习TypeScript',
      description: '阅读官方文档',
      completed: false,
      createdAt: new Date(),
      priority: 'medium',
    },
  ]);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: '1',
      title: '系统通知',
      content: '新版本v1.2.0已发布，请及时更新',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
      type: 'info',
    },
    {
      id: '2',
      title: '任务提醒',
      content: '您有3个待办事项即将到期',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
      type: 'warning',
    },
    {
      id: '3',
      title: '完成通知',
      content: '任务"学习React"已完成',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5小时前
      type: 'success',
    },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<
    'low' | 'medium' | 'high'
  >('medium');
  const [activeTab, setActiveTab] = useState<'todos' | 'messages'>('todos');

  const addTodo = () => {
    if (!newTodoTitle.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      createdAt: new Date(),
      priority: selectedPriority,
    };

    setTodos([newTodo, ...todos]);
    setNewTodoTitle('');
    setNewTodoDescription('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    Alert.alert('删除任务', '确定要删除这个任务吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: () => setTodos(todos.filter(todo => todo.id !== id)),
      },
    ]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(
      messages.map(message =>
        message.id === id ? { ...message, read: true } : message,
      ),
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4757';
      case 'medium':
        return '#ffa502';
      case 'low':
        return '#2ed573';
      default:
        return '#a4b0be';
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'info':
        return '#3498db';
      case 'warning':
        return '#f39c12';
      case 'success':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return date.toLocaleDateString();
  };

  const unreadCount = messages.filter(msg => !msg.read).length;
  const pendingTodos = todos.filter(todo => !todo.completed).length;

  return (
    <Container>
      {/* 顶部选项卡 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'todos' && styles.activeTab]}
          onPress={() => setActiveTab('todos')}
        >
          <Text style={styles.tabText}>待办事项</Text>
          {pendingTodos > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingTodos}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={styles.tabText}>消息</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {activeTab === 'todos' ? (
        <View style={styles.todoContainer}>
          {/* 添加新任务 */}
          <View style={styles.addForm}>
            <TextInput
              style={styles.input}
              placeholder="任务标题"
              value={newTodoTitle}
              onChangeText={setNewTodoTitle}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="任务描述（可选）"
              value={newTodoDescription}
              onChangeText={setNewTodoDescription}
              multiline
            />

            <View style={styles.priorityContainer}>
              {(['low', 'medium', 'high'] as const).map(priority => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    selectedPriority === priority && styles.selectedPriority,
                    { borderColor: getPriorityColor(priority) },
                  ]}
                  onPress={() => setSelectedPriority(priority)}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      selectedPriority === priority && {
                        color: getPriorityColor(priority),
                      },
                    ]}
                  >
                    {priority === 'high'
                      ? '高'
                      : priority === 'medium'
                      ? '中'
                      : '低'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Text style={styles.addButtonText}>添加任务</Text>
            </TouchableOpacity>
          </View>

          {/* 待办事项列表 */}
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>
                <View style={styles.todoContent}>
                  <View style={styles.todoHeader}>
                    <Text
                      style={[
                        styles.todoTitle,
                        item.completed && styles.completedText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={[
                        styles.priorityDot,
                        { backgroundColor: getPriorityColor(item.priority) },
                      ]}
                    />
                  </View>

                  {item.description && (
                    <Text style={styles.todoDescription}>
                      {item.description}
                    </Text>
                  )}

                  <Text style={styles.todoTime}>
                    {formatTime(item.createdAt)}
                  </Text>
                </View>

                <View style={styles.todoActions}>
                  <Switch
                    value={item.completed}
                    onValueChange={() => toggleTodo(item.id)}
                  />
                  <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#ff4757" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>暂无待办事项</Text>
            }
          />
        </View>
      ) : (
        <View style={styles.messagesContainer}>
          {/* 消息列表 */}
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.messageItem, !item.read && styles.unreadMessage]}
                onPress={() => markMessageAsRead(item.id)}
              >
                <View style={styles.messageHeader}>
                  <View
                    style={[
                      styles.messageTypeIndicator,
                      { backgroundColor: getMessageColor(item.type) },
                    ]}
                  />
                  <Text style={styles.messageTitle}>{item.title}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.messageContent}>{item.content}</Text>

                <View style={styles.messageFooter}>
                  <Text style={styles.messageTime}>
                    {formatTime(item.timestamp)}
                  </Text>
                  <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                    <Ionicons name="close" size={16} color="#95a5a6" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>暂无消息</Text>}
          />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  badge: {
    backgroundColor: '#ff4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  todoContainer: {
    flex: 1,
    padding: 16,
  },
  addForm: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  priorityButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedPriority: {
    backgroundColor: '#f1f8ff',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  todoContent: {
    flex: 1,
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginRight: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  todoTime: {
    fontSize: 12,
    color: '#adb5bd',
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  unreadMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageTypeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  messageContent: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: '#adb5bd',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 40,
    fontSize: 16,
  },
});

export default TodoApp;
