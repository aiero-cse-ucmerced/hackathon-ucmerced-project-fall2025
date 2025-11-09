'use client';

import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../../components/ToggleSwitch';
import Link from 'next/link';

const PreferencesPage = () => {
  const [activeTab, setActiveTab] = useState('account'); // 'account', 'customize', 'mobile', 'email', 'plan'
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [mobileNotifications, setMobileNotifications] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: string) => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(selectedTheme);
    
    if (selectedTheme === 'dark') {
      html.style.backgroundColor = '#1f2937';
      html.style.color = '#f3f4f6';
    } else if (selectedTheme === 'light') {
      html.style.backgroundColor = '#ffffff';
      html.style.color = '#111827';
    } else if (selectedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
        html.style.backgroundColor = '#1f2937';
        html.style.color = '#f3f4f6';
      } else {
        html.classList.add('light');
        html.style.backgroundColor = '#ffffff';
        html.style.color = '#111827';
      }
    }
  };
  const [enableHover, setEnableHover] = useState(false);
  const [studyRemindersEmail, setStudyRemindersEmail] = useState(false);
  const [practiceNotificationsEmail, setPracticeNotificationsEmail] = useState(false);
  const [dailyStudyRemindersEmail, setDailyStudyRemindersEmail] = useState(false);
  const [streakReminderEmail, setStreakReminderEmail] = useState(false);
  const [levelProgressEmail, setLevelProgressEmail] = useState(false);
  const [inactivityReminderEmail, setInactivityReminderEmail] = useState(false);
  const [storePromotionsEmail, setStorePromotionsEmail] = useState(false);
  const [classUpdatesEmail, setClassUpdatesEmail] = useState(false);
  const [newFollowerEmail, setNewFollowerEmail] = useState(false);
  const [friendActivityEmail, setFriendActivityEmail] = useState(false);
  const [referralUpdatesEmail, setReferralUpdatesEmail] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);

  const [studyRemindersMobile, setStudyRemindersMobile] = useState(false);
  const [practiceNotificationsMobile, setPracticeNotificationsMobile] = useState(false);
  const [dailyStudyRemindersMobile, setDailyStudyRemindersMobile] = useState(false);
  const [streakReminderMobile, setStreakReminderMobile] = useState(false);
  const [levelProgressMobile, setLevelProgressMobile] = useState(false);
  const [inactivityReminderMobile, setInactivityReminderMobile] = useState(false);
  const [storePromotionsMobile, setStorePromotionsMobile] = useState(false);
  const [classUpdatesMobile, setClassUpdatesMobile] = useState(false);
  const [newFollowerMobile, setNewFollowerMobile] = useState(false);
  const [friendActivityMobile, setFriendActivityMobile] = useState(false);
  const [referralUpdatesMobile, setReferralUpdatesMobile] = useState(false);
  const [marketingMobile, setMarketingMobile] = useState(false);


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 text-sm mb-6">Manage all your preferences</p>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mt-4 overflow-x-auto scrollbar-hide">
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm ${
              activeTab === 'account' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('account')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm ${
              activeTab === 'customize' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('customize')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Customize
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm ${
              activeTab === 'mobile' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('mobile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Mobile Notifications
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm ${
              activeTab === 'email' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('email')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Notifications
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm ${
              activeTab === 'plan' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('plan')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 6l-3 3m-6 6h.01M12 12h.01M16 12h.01M21 12h.01M12 18h.01M12 21h.01M12 3h.01M6 12h.01M3 12h.01M12 6V3m0 18v-3m-3-6H3m18 0h-3m-6-3V3m0 18v-3m-3-6H3m18 0h-3" />
            </svg>
            Your Plan
          </button>
        </div>
      </div>

      {activeTab === 'account' && (
        <section className="p-4 mt-4">
          <h2 className="text-xl font-medium mb-4">Account</h2>
          <div className="flex items-center mb-4">
            <img src="/images/student.png" alt="Profile" className="h-16 w-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-medium">Name</p>
              <p className="text-gray-600 text-sm">Email</p>
            </div>
            <Link href="/preferences/account/name">
              <button className="ml-auto text-blue-600 text-sm">Change</button>
            </Link>
          </div>
  
          <h3 className="text-lg font-medium mb-2">Account Security</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Username</p>
            <div className="flex items-center">
              <p className="text-gray-600 mr-4">your_username</p>
              <Link href="/preferences/account/username">
                <button className="text-blue-600 text-sm">Change</button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Email</p>
            <div className="flex items-center">
              <p className="text-gray-600 mr-4">your_email@example.com</p>
              <Link href="/preferences/account/email">
                <button className="text-blue-600 text-sm">Change</button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p>Connected account</p>
            <div className="flex items-center">
              <p className="text-gray-600 mr-4">Currently signed in with this account.</p>
              <button className="text-blue-600 text-sm">Google sign in</button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'customize' && (
        <section className="p-4 mt-4">
          <h2 className="text-xl font-medium mb-4">Appearance</h2>
          <h3 className="text-lg font-medium mb-2">Select cover image</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Upload photo</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">Upload photo</button>
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Select cover color</h3>
          <div className="flex space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-yellow-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-pink-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-indigo-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-teal-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer border-2 border-transparent hover:border-blue-500"></div>
            <div className="h-8 w-8 rounded-full bg-gray-800 cursor-pointer border-2 border-blue-500"></div> {/* Selected color */}
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Page Settings</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Select a default page</p>
            <select className="border rounded-md p-1 text-sm">
              <option>Home</option>
              <option>Dashboard</option>
            </select>
          </div>
          <p className="text-gray-600 text-sm mt-1">This page will be the default page you land on when logged in.</p>

          <div className="flex justify-between items-center py-2 border-b border-gray-200 mt-4">
            <p>Enable hover for side navigation</p>
            <ToggleSwitch isOn={enableHover} handleToggle={() => setEnableHover(!enableHover)} />
          </div>
          <p className="text-gray-600 text-sm mt-1">This expands the side navigation on hover.</p>

          <h3 className="text-lg font-medium mt-4 mb-2">Theme</h3>
          {mounted && (
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => {
                    const newTheme = 'light';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                  }}
                  className="mr-2"
                />
                <span>Light</span>
              </label>
              <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => {
                    const newTheme = 'dark';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                  }}
                  className="mr-2"
                />
                <span>Dark</span>
              </label>
              <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === 'system'}
                  onChange={() => {
                    const newTheme = 'system';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                  }}
                  className="mr-2"
                />
                <span>System</span>
              </label>
            </div>
          )}
        </section>
      )}

      {activeTab === 'email' && (
        <section className="p-4 mt-4">
          <h2 className="text-xl font-medium mb-4">Email Notification</h2>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Study Reminders</p>
            <ToggleSwitch isOn={studyRemindersEmail} handleToggle={() => setStudyRemindersEmail(!studyRemindersEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Practice notifications</p>
            <ToggleSwitch isOn={practiceNotificationsEmail} handleToggle={() => setPracticeNotificationsEmail(!practiceNotificationsEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Daily study reminders</p>
            <ToggleSwitch isOn={dailyStudyRemindersEmail} handleToggle={() => setDailyStudyRemindersEmail(!dailyStudyRemindersEmail)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>When should we notify you?</p>
            <button className="text-blue-600 text-sm">Pick a time</button>
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Alerts</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Streak reminder</p>
            <ToggleSwitch isOn={streakReminderEmail} handleToggle={() => setStreakReminderEmail(!streakReminderEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Level & Progress</p>
            <ToggleSwitch isOn={levelProgressEmail} handleToggle={() => setLevelProgressEmail(!levelProgressEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Inactivity Reminder</p>
            <ToggleSwitch isOn={inactivityReminderEmail} handleToggle={() => setInactivityReminderEmail(!inactivityReminderEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Store Promotions</p>
            <ToggleSwitch isOn={storePromotionsEmail} handleToggle={() => setStorePromotionsEmail(!storePromotionsEmail)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>Class Updates</p>
            <ToggleSwitch isOn={classUpdatesEmail} handleToggle={() => setClassUpdatesEmail(!classUpdatesEmail)} />
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Friends</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>New follower</p>
            <ToggleSwitch isOn={newFollowerEmail} handleToggle={() => setNewFollowerEmail(!newFollowerEmail)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Friend activity</p>
            <ToggleSwitch isOn={friendActivityEmail} handleToggle={() => setFriendActivityEmail(!friendActivityEmail)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>Referral updates</p>
            <ToggleSwitch isOn={referralUpdatesEmail} handleToggle={() => setReferralUpdatesEmail(!referralUpdatesEmail)} />
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Marketing</h3>
          <div className="flex justify-between items-center py-2">
            <p>Product updates, company notes, etc.</p>
            <ToggleSwitch isOn={marketingEmail} handleToggle={() => setMarketingEmail(!marketingEmail)} />
          </div>
        </section>
      )}

      {activeTab === 'mobile' && (
        <section className="p-4 mt-4">
          <h2 className="text-xl font-medium mb-4">Mobile Notification</h2>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Study Reminders</p>
            <ToggleSwitch isOn={studyRemindersMobile} handleToggle={() => setStudyRemindersMobile(!studyRemindersMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Practice notifications</p>
            <ToggleSwitch isOn={practiceNotificationsMobile} handleToggle={() => setPracticeNotificationsMobile(!practiceNotificationsMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Daily study reminders</p>
            <ToggleSwitch isOn={dailyStudyRemindersMobile} handleToggle={() => setDailyStudyRemindersMobile(!dailyStudyRemindersMobile)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>When should we notify you?</p>
            <button className="text-blue-600 text-sm">Pick a time</button>
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Alerts</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Streak reminder</p>
            <ToggleSwitch isOn={streakReminderMobile} handleToggle={() => setStreakReminderMobile(!streakReminderMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Level & Progress</p>
            <ToggleSwitch isOn={levelProgressMobile} handleToggle={() => setLevelProgressMobile(!levelProgressMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Inactivity Reminder</p>
            <ToggleSwitch isOn={inactivityReminderMobile} handleToggle={() => setInactivityReminderMobile(!inactivityReminderMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Store Promotions</p>
            <ToggleSwitch isOn={storePromotionsMobile} handleToggle={() => setStorePromotionsMobile(!storePromotionsMobile)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>Class Updates</p>
            <ToggleSwitch isOn={classUpdatesMobile} handleToggle={() => setClassUpdatesMobile(!classUpdatesMobile)} />
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Friends</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>New follower</p>
            <ToggleSwitch isOn={newFollowerMobile} handleToggle={() => setNewFollowerMobile(!newFollowerMobile)} />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <p>Friend activity</p>
            <ToggleSwitch isOn={friendActivityMobile} handleToggle={() => setFriendActivityMobile(!friendActivityMobile)} />
          </div>
          <div className="flex justify-between items-center py-2">
            <p>Referral updates</p>
            <ToggleSwitch isOn={referralUpdatesMobile} handleToggle={() => setReferralUpdatesMobile(!referralUpdatesMobile)} />
          </div>

          <h3 className="text-lg font-medium mt-4 mb-2">Marketing</h3>
          <div className="flex justify-between items-center py-2">
            <p>Product updates, company notes, etc.</p>
            <ToggleSwitch isOn={marketingMobile} handleToggle={() => setMarketingMobile(!marketingMobile)} />
          </div>
        </section>
      )}
    </div>
  );
};

export default PreferencesPage;