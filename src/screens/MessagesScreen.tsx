import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { getTranslations } from '@/i18n/translations';
import { quickReplyOptions } from '@/mock/agentPrompts';
import { consultationTopics } from '@/mock/mentorSessionsData';
import { useChatStore } from '@/store/useChatStore';
import { useHRChatStore } from '@/store/useHRChatStore';
import { useMentorStore } from '@/store/useMentorStore';
import { useUserStore } from '@/store/useUserStore';
import type { MentorSessionSlot } from '@/types';

type MessageTab = 'mentor_ai' | 'hr_chat' | 'mentor_sessions';

export function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<MessageTab>('mentor_ai');
  const profile = useUserStore((state) => state.profile);
  const language = useUserStore((state) => state.language);
  const t = getTranslations(language);

  // 1. AI Chat Store
  const { messages: aiMessages, agentStatus, sendMessage: sendAIMessage } = useChatStore();
  const [aiDraft, setAiDraft] = useState('');

  // 2. HR Chat Store
  const {
    contacts: hrContacts,
    selectedContactId,
    messages: hrMessagesMap,
    selectContact,
    sendMessage: sendHRMessage,
  } = useHRChatStore();
  const [hrDraft, setHrDraft] = useState('');

  // 3. Mentor Sessions Store
  const { slots, bookedSessions, bookSlot, cancelSlot } = useMentorStore();
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<MentorSessionSlot | null>(
    null
  );
  const [selectedTopic, setSelectedTopic] = useState(consultationTopics[0].label);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  const activeHRContact = hrContacts.find((c) => c.id === selectedContactId) ?? hrContacts[0];
  const activeHRMessages = hrMessagesMap[activeHRContact?.id] || [];

  const handleAISubmit = (value = aiDraft) => {
    if (!value.trim()) return;
    sendAIMessage(value);
    setAiDraft('');
  };

  const handleHRSubmit = () => {
    if (!hrDraft.trim()) return;
    sendHRMessage(hrDraft);
    setHrDraft('');
  };

  const handleConfirmBooking = () => {
    if (!selectedSlotForBooking) return;
    bookSlot(selectedSlotForBooking.id, selectedTopic);
    setSelectedSlotForBooking(null);
    setBookingSuccessModal(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Top Header & Segmented Tabs */}
      <View className="border-b border-slate-200 bg-white px-5 pt-2 pb-3">
        <View className="flex-row items-start justify-between gap-3">
          <View className="min-w-0 flex-1">
            <Text className="text-sm font-semibold uppercase text-primary-600">
              {t.messages.tagline}
            </Text>
            <Text className="text-2xl font-bold leading-7 text-slate-900">{t.messages.title}</Text>
          </View>
          {activeTab === 'mentor_ai' ? (
            <View className="shrink-0">
              <AgentStatusBadge status={agentStatus} />
            </View>
          ) : (
            <View className="shrink-0 flex-row items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1">
              <View className="h-2 w-2 rounded-full bg-emerald-500" />
              <Text className="text-xs font-semibold text-emerald-700">{t.messages.availableMentorsBadge}</Text>
            </View>
          )}
        </View>

        {/* 3-Way Segmented Control */}
        <View className="mt-3 flex-row gap-1 rounded-2xl bg-slate-100 p-1">
          <Pressable
            onPress={() => setActiveTab('mentor_ai')}
            className={`min-w-0 flex-1 items-center rounded-xl px-1 py-2 ${
              activeTab === 'mentor_ai' ? 'bg-white shadow-xs' : ''
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-bold ${
                activeTab === 'mentor_ai' ? 'text-primary-700' : 'text-slate-500'
              }`}
            >
              {t.messages.tabs.mentorAi}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('hr_chat')}
            className={`min-w-0 flex-1 items-center rounded-xl px-1 py-2 ${
              activeTab === 'hr_chat' ? 'bg-white shadow-xs' : ''
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-bold ${
                activeTab === 'hr_chat' ? 'text-primary-700' : 'text-slate-500'
              }`}
            >
              {t.messages.tabs.hrChat}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('mentor_sessions')}
            className={`min-w-0 flex-1 items-center rounded-xl px-1 py-2 ${
              activeTab === 'mentor_sessions' ? 'bg-white shadow-xs' : ''
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-bold ${
                activeTab === 'mentor_sessions' ? 'text-primary-700' : 'text-slate-500'
              }`}
            >
              {t.messages.tabs.mentorSessions(bookedSessions.length)}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* TAB 1: MENTOR AI */}
      {activeTab === 'mentor_ai' && (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerClassName="px-5 py-4 pb-8" showsVerticalScrollIndicator={false}>
            {/* Context Pill */}
            <View className="mb-3 items-center">
              <View className="rounded-full bg-slate-200/70 px-3 py-1">
                <Text className="text-[11px] font-medium text-slate-600">
                  {t.messages.aiTab.contextPrefix(
                    profile.goal?.targetRole ?? 'AI Application Engineer',
                    profile.goal?.currentLevel ?? (language === 'en' ? 'Intermediate' : 'Średniozaawansowany')
                  )}
                </Text>
              </View>
            </View>

            {aiMessages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <View
                  key={message.id}
                  className={`mb-3 max-w-[86%] rounded-3xl px-4 py-3 ${
                    isUser
                      ? 'self-end bg-primary-600'
                      : 'self-start border border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  <Text
                    className={`text-base leading-6 ${
                      isUser ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {message.content}
                  </Text>
                </View>
              );
            })}
            {agentStatus !== 'idle' ? (
              <View className="mb-3 flex-row items-center gap-2 self-start rounded-2xl bg-white px-3.5 py-2 border border-slate-200">
                <Ionicons name="sparkles" size={14} color="#4f46e5" />
                <Text className="text-xs text-slate-500">{t.messages.aiTab.analyzingText}</Text>
              </View>
            ) : null}
          </ScrollView>

          {/* Quick Replies & Input */}
          <View className="border-t border-slate-200 bg-white px-5 pb-4 pt-3">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2 pb-2.5"
            >
              {quickReplyOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => handleAISubmit(option.prompt)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 active:bg-slate-100"
                >
                  <Text className="text-xs font-medium text-slate-700">{option.label}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View className="min-h-[50px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
              <TextInput
                value={aiDraft}
                onChangeText={setAiDraft}
                placeholder={t.messages.aiTab.inputPlaceholder}
                placeholderTextColor="#94a3b8"
                className="flex-1 py-2.5 text-base text-slate-900"
                onSubmitEditing={() => handleAISubmit()}
                returnKeyType="send"
              />
              <Pressable
                onPress={() => handleAISubmit()}
                className="h-8 w-8 items-center justify-center rounded-full bg-primary-600"
              >
                <Ionicons name="arrow-up" size={18} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* TAB 2: CZAT Z KIMŚ Z HR */}
      {activeTab === 'hr_chat' && (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Contacts selector horizontal bar */}
          <View className="border-b border-slate-200 bg-slate-100/70 px-4 py-2.5">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {hrContacts.map((contact) => {
                const isSelected = contact.id === activeHRContact?.id;
                return (
                  <Pressable
                    key={contact.id}
                    onPress={() => selectContact(contact.id)}
                    className={`flex-row items-center gap-2 rounded-2xl px-3 py-2 ${
                      isSelected ? 'bg-white shadow-xs' : 'bg-slate-200/60'
                    }`}
                  >
                    <View
                      className="h-7 w-7 items-center justify-center rounded-full"
                      style={{ backgroundColor: contact.avatarBg }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {contact.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? 'text-slate-900' : 'text-slate-600'
                        }`}
                      >
                        {contact.name}
                      </Text>
                      <Text className="text-[10px] text-slate-400">{contact.company}</Text>
                    </View>
                    {contact.isOnline ? (
                      <View className="h-2 w-2 rounded-full bg-emerald-500" />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* HR Chat Messages */}
          <ScrollView contentContainerClassName="px-5 py-4 pb-8" showsVerticalScrollIndicator={false}>
            {/* Recruiter info header box */}
            <View className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <View className="flex-row items-center gap-3">
                <View
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: activeHRContact.avatarBg }}
                >
                  <Text className="text-base font-bold text-white">
                    {activeHRContact.name.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900">{activeHRContact.name}</Text>
                  <Text className="text-xs text-slate-500">
                    {activeHRContact.role} · {activeHRContact.company}
                  </Text>
                </View>
                <Badge
                  label={activeHRContact.isOnline ? t.messages.hrTab.activeBadge : t.messages.hrTab.replyTimeBadge}
                  variant={activeHRContact.isOnline ? 'success' : 'default'}
                />
              </View>
              <Text className="mt-2 text-[11px] leading-4 text-slate-500">
                {t.messages.hrTab.recruiterInfoDesc}
              </Text>
            </View>

            {activeHRMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <View
                  key={msg.id}
                  className={`mb-3 max-w-[85%] rounded-3xl px-4 py-3 ${
                    isUser
                      ? 'self-end bg-primary-600'
                      : 'self-start border border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  <Text
                    className={`text-base leading-6 ${
                      isUser ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    className={`mt-1 text-[10px] ${
                      isUser ? 'text-primary-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.createdAt}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* HR Chat Input */}
          <View className="border-t border-slate-200 bg-white px-5 pb-4 pt-3">
            <View className="min-h-[50px] flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
              <TextInput
                value={hrDraft}
                onChangeText={setHrDraft}
                placeholder={t.messages.hrTab.inputPlaceholder(activeHRContact.name.split(' ')[0])}
                placeholderTextColor="#94a3b8"
                className="flex-1 py-2.5 text-base text-slate-900"
                onSubmitEditing={handleHRSubmit}
                returnKeyType="send"
              />
              <Pressable
                onPress={handleHRSubmit}
                className="h-8 w-8 items-center justify-center rounded-full bg-primary-600"
              >
                <Ionicons name="arrow-up" size={18} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* TAB 3: MOŻLIWY CZAS Z MENTOREM / REZERWACJA SESJI 1:1 */}
      {activeTab === 'mentor_sessions' && (
        <ScrollView contentContainerClassName="px-5 py-4 pb-12" showsVerticalScrollIndicator={false}>
          {/* Hero Banner */}
          <Card className="border-primary-100 bg-gradient-to-br from-white to-primary-50/40 p-4">
            <View className="flex-row items-start gap-2">
              <View className="mt-0.5 shrink-0">
                <Ionicons name="calendar" size={20} color="#4f46e5" />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="text-base font-bold leading-5 text-slate-900">
                  {t.messages.sessionsTab.bannerTitle}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-xs leading-5 text-slate-600">
              {t.messages.sessionsTab.bannerDesc}
            </Text>
          </Card>

          {/* TWOJE ZAPLANOWANE SESJE */}
          {bookedSessions.length > 0 && (
            <View className="mt-6">
              <Text className="text-base font-bold text-slate-900">
                {t.messages.sessionsTab.bookedSessionsHeader(bookedSessions.length)}
              </Text>
              <View className="mt-2.5 gap-3">
                {bookedSessions.map((session) => (
                  <Card key={session.id} className="border-emerald-200 bg-emerald-50/30 p-4">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center gap-1.5">
                          <Ionicons name="checkmark-circle" size={16} color="#059669" />
                          <Text className="text-xs font-bold text-emerald-800">
                            {t.messages.sessionsTab.bookingConfirmed}
                          </Text>
                        </View>
                        <Text className="mt-1 text-base font-bold text-slate-900">
                          {session.mentorName}
                        </Text>
                        <Text className="text-xs text-slate-500">
                          {session.mentorTitle} · {session.mentorCompany}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => cancelSlot(session.id)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1"
                      >
                        <Text className="text-[11px] font-semibold text-rose-600">{t.messages.sessionsTab.cancelButton}</Text>
                      </Pressable>
                    </View>

                    <View className="mt-3 flex-row items-center gap-3 border-t border-emerald-100 pt-2.5">
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="time-outline" size={13} color="#059669" />
                        <Text className="text-xs font-bold text-emerald-900">
                          {session.date}, {session.time}
                        </Text>
                      </View>
                      <Text className="text-xs text-slate-400">•</Text>
                      <Text className="text-xs text-slate-600">{t.messages.sessionsTab.durationLabel}</Text>
                    </View>

                    {session.bookedTopic ? (
                      <Text className="mt-2 text-xs text-slate-600">
                        {t.messages.sessionsTab.topicPrefix} <Text className="font-semibold text-slate-800">{session.bookedTopic}</Text>
                      </Text>
                    ) : null}
                  </Card>
                ))}
              </View>
            </View>
          )}

          {/* DOSTĘPNE TERMINY */}
          <View className="mt-6">
            <View className="flex-row items-start justify-between gap-3">
              <View className="min-w-0 flex-1">
                <Text className="text-base font-bold leading-5 text-slate-900">
                  {t.messages.sessionsTab.availableSlotsHeader}
                </Text>
              </View>
              <Text className="shrink-0 text-xs font-medium text-slate-400">{t.messages.sessionsTab.availableSlotsSubheader}</Text>
            </View>

            <View className="mt-3 gap-3">
              {slots.map((slot) => {
                const isBooked = !slot.available;
                return (
                  <Card key={slot.id} className="p-4">
                    <View className="flex-row items-start justify-between gap-2">
                      <View className="min-w-0 flex-1">
                        <Text className="text-sm font-bold leading-5 text-slate-900">
                          {slot.mentorName}
                        </Text>
                        <Text className="mt-0.5 text-xs leading-4 text-slate-500">
                          {slot.mentorTitle} · {slot.mentorCompany}
                        </Text>
                      </View>
                      <View className="shrink-0">
                        <Badge label={`${slot.durationMinutes} min`} variant="info" />
                      </View>
                    </View>

                    <View className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50 p-2">
                      <Text className="text-[11px] font-medium leading-4 text-slate-600">
                        {t.messages.sessionsTab.specializationPrefix} {slot.specialization}
                      </Text>
                    </View>

                    <View className="mt-3 gap-2.5 border-t border-slate-100 pt-3">
                      <View className="flex-row items-center gap-1.5">
                        <View className="shrink-0">
                          <Ionicons name="calendar-outline" size={14} color="#4f46e5" />
                        </View>
                        <View className="min-w-0 flex-1">
                          <Text className="text-xs font-bold leading-4 text-slate-800">
                            {slot.date}, {slot.time}
                          </Text>
                        </View>
                      </View>

                      {isBooked ? (
                        <Text className="text-xs font-bold text-emerald-700">{t.messages.sessionsTab.bookedStatus}</Text>
                      ) : (
                        <Pressable
                          onPress={() => setSelectedSlotForBooking(slot)}
                          className="self-start rounded-xl bg-primary-600 px-3.5 py-1.5 active:bg-primary-700"
                        >
                          <Text className="text-xs font-bold text-white">{t.messages.sessionsTab.selectSlotButton}</Text>
                        </Pressable>
                      )}
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Booking Selection Modal */}
      <Modal
        visible={selectedSlotForBooking !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedSlotForBooking(null)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between border-b border-slate-100 px-5 py-3">
            <Text className="text-base font-bold text-slate-900">{t.messages.modal.bookTitle}</Text>
            <Pressable
              onPress={() => setSelectedSlotForBooking(null)}
              className="h-8 w-8 items-center justify-center rounded-full bg-slate-100"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </Pressable>
          </View>

          {selectedSlotForBooking ? (
            <ScrollView contentContainerClassName="px-5 py-6" showsVerticalScrollIndicator={false}>
              <View className="rounded-2xl border border-primary-100 bg-primary-50/50 p-4">
                <Text className="text-xs font-bold uppercase tracking-wider text-primary-700">
                  {t.messages.modal.selectedMentorAndDate}
                </Text>
                <Text className="mt-1 text-xl font-bold text-slate-900">
                  {selectedSlotForBooking.mentorName}
                </Text>
                <Text className="text-xs text-slate-600">
                  {selectedSlotForBooking.mentorTitle} · {selectedSlotForBooking.mentorCompany}
                </Text>

                <View className="mt-3 flex-row items-center gap-2 border-t border-primary-200/50 pt-2.5">
                  <Ionicons name="time" size={16} color="#4f46e5" />
                  <Text className="text-sm font-bold text-primary-900">
                    {selectedSlotForBooking.date}, {selectedSlotForBooking.time}
                  </Text>
                </View>
              </View>

              <Text className="mt-6 text-base font-bold text-slate-900">
                {t.messages.modal.chooseTopicTitle}
              </Text>
              <View className="mt-3 gap-2.5">
                {consultationTopics.map((top) => {
                  const isSelected = selectedTopic === top.label;
                  return (
                    <Pressable
                      key={top.id}
                      onPress={() => setSelectedTopic(top.label)}
                      className={`flex-row items-center justify-between rounded-2xl border p-3.5 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isSelected ? 'text-primary-900 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {top.label}
                      </Text>
                      {isSelected ? (
                        <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
                      ) : (
                        <View className="h-5 w-5 rounded-full border border-slate-300" />
                      )}
                    </Pressable>
                  );
                })}
              </View>

              <View className="mt-8 gap-3">
                <Button label={t.messages.modal.confirmButton} onPress={handleConfirmBooking} />
                <Button
                  label={t.messages.modal.cancelButton}
                  variant="outline"
                  onPress={() => setSelectedSlotForBooking(null)}
                />
              </View>
            </ScrollView>
          ) : null}
        </SafeAreaView>
      </Modal>

      {/* Booking Success Modal */}
      <Modal
        visible={bookingSuccessModal}
        animationType="fade"
        transparent
        onRequestClose={() => setBookingSuccessModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full rounded-3xl bg-white p-6 shadow-xl">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-emerald-100 self-center">
              <Ionicons name="checkmark" size={26} color="#059669" />
            </View>
            <Text className="mt-3 text-center text-xl font-bold text-slate-900">
              {t.messages.modal.successTitle}
            </Text>
            <Text className="mt-2 text-center text-sm leading-5 text-slate-600">
              {t.messages.modal.successDesc}
            </Text>
            <Button
              className="mt-6"
              label={t.messages.modal.successButton}
              onPress={() => setBookingSuccessModal(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
