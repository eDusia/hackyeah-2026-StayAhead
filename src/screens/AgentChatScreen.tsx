import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { quickReplyOptions } from '@/mock/agentPrompts';
import { useChatStore } from '@/store/useChatStore';
import { useUserStore } from '@/store/useUserStore';

export function AgentChatScreen() {
  const profile = useUserStore((state) => state.profile);
  const { messages, agentStatus, sendMessage } = useChatStore();
  const [draft, setDraft] = useState('');

  const submit = (value = draft) => {
    if (!value.trim()) {
      return;
    }
    sendMessage(value);
    setDraft('');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="border-b border-slate-100 bg-white px-5 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-slate-900">Mentor AI</Text>
              <Text className="text-sm text-slate-500">Kontekst: {profile.goal?.targetRole ?? 'brak celu'}</Text>
            </View>
            <AgentStatusBadge status={agentStatus} />
          </View>
        </View>

        <ScrollView contentContainerClassName="px-5 py-4">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <View key={message.id} className={`mb-3 max-w-[86%] rounded-3xl px-4 py-3 ${isUser ? 'self-end bg-primary-600' : 'self-start bg-white border border-slate-100'}`}>
                <Text className={`text-base leading-6 ${isUser ? 'text-white' : 'text-slate-800'}`}>{message.content}</Text>
              </View>
            );
          })}
          {agentStatus !== 'idle' ? (
            <Text className="mb-3 text-sm text-slate-400">Mentor analizuje Twój profil…</Text>
          ) : null}
        </ScrollView>

        <View className="border-t border-slate-100 bg-white px-5 pb-4 pt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-3">
            {quickReplyOptions.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => submit(option.prompt)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <Text className="text-sm font-medium text-slate-600">{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View className="min-h-[52px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Napisz do mentora…"
              placeholderTextColor="#94a3b8"
              className="flex-1 py-3 text-base text-slate-900"
              onSubmitEditing={() => submit()}
              returnKeyType="send"
            />
            <Pressable onPress={() => submit()} className="h-9 w-9 items-center justify-center rounded-full bg-primary-600">
              <Ionicons name="send" size={16} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
