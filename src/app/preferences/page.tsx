'use client';

import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../../components/ToggleSwitch';
import Link from 'next/link';
import { useTheme } from '../../components/ThemeProvider';
import { useAuth } from '../../hooks/useAuth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase/clientApp';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase/clientApp';

const PreferencesPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [enableHover, setEnableHover] = useState(false);
  const [selectedColor, setSelectedColor] = useState('gray-800');
  const [defaultPage, setDefaultPage] = useState('Home');
  const [isLoading, setIsLoading] = useState(false);
  
  // User profile data
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState({
    studyReminders: false,
    practiceNotifications: false,
    dailyStudyReminders: false,
    streakReminder: false,
    levelProgress: false,
    inactivityReminder: false,
    storePromotions: false,
    classUpdates: false,
    newFollower: false,
    friendActivity: false,
    referralUpdates: false,
    marketing: false,
  });

  const [mobileNotifications, setMobileNotifications] = useState({
    studyReminders: false,
    practiceNotifications: false,
    dailyStudyReminders: false,
    streakReminder: false,
    levelProgress: false,
    inactivityReminder: false,
    storePromotions: false,
    classUpdates: false,
    newFollower: false,
    friendActivity: false,
    referralUpdates: false,
    marketing: false,
  });

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.uid) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setUsername(data.username || '');
          setEmailNotifications(data.emailNotifications || emailNotifications);
          setMobileNotifications(data.mobileNotifications || mobileNotifications);
          setSelectedColor(data.coverColor || 'gray-800');
          setDefaultPage(data.defaultPage || 'Home');
          setEnableHover(data.enableHover || false);
        } else {
          // Create user document if it doesn't exist
          await setDoc(doc(db, 'users', user.uid), {
            username: user.displayName?.split(' ')[0] || user.email?.split('@')[0] || '',
            email: user.email || '',
            createdAt: serverTimestamp(),
            emailNotifications,
            mobileNotifications,
            coverColor: selectedColor,
            defaultPage,
            enableHover: false,
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user?.uid]);

  // Save notification preferences
  const saveNotificationPreferences = async (type: 'email' | 'mobile', preferences: any) => {
    if (!user?.uid) return;
    
    try {
      setIsLoading(true);
      await updateDoc(doc(db, 'users', user.uid), {
        [`${type}Notifications`]: preferences,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error saving ${type} notifications:`, error);
      alert(`Failed to save ${type} notification preferences`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      alert(error.message || 'Failed to sign in with Google');
    }
  };

  // Update notification preference
  const updateNotificationPreference = (type: 'email' | 'mobile', key: string, value: boolean) => {
    if (type === 'email') {
      const updated = { ...emailNotifications, [key]: value };
      setEmailNotifications(updated);
      saveNotificationPreferences('email', updated);
    } else {
      const updated = { ...mobileNotifications, [key]: value };
      setMobileNotifications(updated);
      saveNotificationPreferences('mobile', updated);
    }
  };

  // Save user preferences
  const saveUserPreferences = async () => {
    if (!user?.uid) return;
    
    try {
      setIsLoading(true);
      await updateDoc(doc(db, 'users', user.uid), {
        coverColor: selectedColor,
        defaultPage,
        enableHover,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving user preferences:', error);
      alert('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // Update cover color
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (user?.uid) {
      updateDoc(doc(db, 'users', user.uid), {
        coverColor: color,
        updatedAt: serverTimestamp(),
      }).catch(console.error);
    }
  };

  // Update default page
  const handleDefaultPageChange = (page: string) => {
    setDefaultPage(page);
    if (user?.uid) {
      updateDoc(doc(db, 'users', user.uid), {
        defaultPage: page,
        updatedAt: serverTimestamp(),
      }).catch(console.error);
    }
  };

  // Update hover setting
  const handleHoverToggle = () => {
    const newValue = !enableHover;
    setEnableHover(newValue);
    if (user?.uid) {
      updateDoc(doc(db, 'users', user.uid), {
        enableHover: newValue,
        updatedAt: serverTimestamp(),
      }).catch(console.error);
    }
  };

  const colors = [
    { name: 'red-500', class: 'bg-red-500' },
    { name: 'green-500', class: 'bg-green-500' },
    { name: 'blue-500', class: 'bg-blue-500' },
    { name: 'yellow-500', class: 'bg-yellow-500' },
    { name: 'purple-500', class: 'bg-purple-500' },
    { name: 'pink-500', class: 'bg-pink-500' },
    { name: 'indigo-500', class: 'bg-indigo-500' },
    { name: 'teal-500', class: 'bg-teal-500' },
    { name: 'orange-500', class: 'bg-orange-500' },
    { name: 'gray-800', class: 'bg-gray-800' },
  ];

  const isGoogleConnected = user?.providerData?.some(provider => provider.providerId === 'google.com');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <Link href="/home">
            <button className="text-secondary mr-4 hover:opacity-80 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-secondary text-sm mt-1">Manage all your preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'account' 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('account')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'customize' 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('customize')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Customize
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'mobile' 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('mobile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Mobile
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'email' 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('email')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'plan' 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('plan')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Your Plan
          </button>
        </div>
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <section className="p-4 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4 overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{user?.displayName || 'User'}</p>
                  <p className="text-secondary text-sm">{user?.email || 'No email'}</p>
                </div>
                <Link href="/preferences/account/name">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    Change
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Account Security</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <p className="font-medium">Username</p>
                  <p className="text-secondary text-sm mt-1">{username || user?.email?.split('@')[0] || 'Not set'}</p>
                </div>
                <Link href="/preferences/account/username">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    Change
                  </button>
                </Link>
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <p className="text-secondary text-sm mt-1">{user?.email || 'Not set'}</p>
                </div>
                <Link href="/preferences/account/email">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    Change
                  </button>
                </Link>
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <div className="flex-1">
                  <p className="font-medium">Connected account</p>
                  <p className="text-secondary text-sm mt-1">
                    {isGoogleConnected ? 'Connected with Google' : 'Not connected'}
                  </p>
                </div>
                {!isGoogleConnected && (
                  <button 
                    onClick={handleGoogleSignIn}
                    className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    Connect Google
                  </button>
                )}
                {isGoogleConnected && (
                  <span className="px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
                    Connected
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Customize Tab */}
      {activeTab === 'customize' && (
        <section className="p-4 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <div>
                <h3 className="text-base font-semibold mb-3">Select cover color</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`h-10 w-10 rounded-full ${color.class} cursor-pointer border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 scale-110' 
                          : 'border-transparent hover:border-gray-400 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Page Settings</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <p className="font-medium">Select a default page</p>
                  <p className="text-secondary text-sm mt-1">This page will be the default page you land on when logged in.</p>
                </div>
                <select 
                  value={defaultPage}
                  onChange={(e) => handleDefaultPageChange(e.target.value)}
                  className="ml-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Dashboard">Dashboard</option>
                </select>
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <div className="flex-1">
                  <p className="font-medium">Enable hover for side navigation</p>
                  <p className="text-secondary text-sm mt-1">This expands the side navigation on hover.</p>
                </div>
                <ToggleSwitch isOn={enableHover} handleToggle={handleHoverToggle} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Theme</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <label className="flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium">Light</span>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium">Dark</span>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium">System</span>
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === 'system'}
                  onChange={() => setTheme('system')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        </section>
      )}

      {/* Email Notifications Tab */}
      {activeTab === 'email' && (
        <section className="p-4 space-y-6">
          <h2 className="text-xl font-bold">Email Notifications</h2>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Study</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Study Reminders</span>
                <ToggleSwitch 
                  isOn={emailNotifications.studyReminders} 
                  handleToggle={() => updateNotificationPreference('email', 'studyReminders', !emailNotifications.studyReminders)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Practice notifications</span>
                <ToggleSwitch 
                  isOn={emailNotifications.practiceNotifications} 
                  handleToggle={() => updateNotificationPreference('email', 'practiceNotifications', !emailNotifications.practiceNotifications)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Daily study reminders</span>
                <ToggleSwitch 
                  isOn={emailNotifications.dailyStudyReminders} 
                  handleToggle={() => updateNotificationPreference('email', 'dailyStudyReminders', !emailNotifications.dailyStudyReminders)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Alerts</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Streak reminder</span>
                <ToggleSwitch 
                  isOn={emailNotifications.streakReminder} 
                  handleToggle={() => updateNotificationPreference('email', 'streakReminder', !emailNotifications.streakReminder)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Level & Progress</span>
                <ToggleSwitch 
                  isOn={emailNotifications.levelProgress} 
                  handleToggle={() => updateNotificationPreference('email', 'levelProgress', !emailNotifications.levelProgress)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Inactivity Reminder</span>
                <ToggleSwitch 
                  isOn={emailNotifications.inactivityReminder} 
                  handleToggle={() => updateNotificationPreference('email', 'inactivityReminder', !emailNotifications.inactivityReminder)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Store Promotions</span>
                <ToggleSwitch 
                  isOn={emailNotifications.storePromotions} 
                  handleToggle={() => updateNotificationPreference('email', 'storePromotions', !emailNotifications.storePromotions)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Class Updates</span>
                <ToggleSwitch 
                  isOn={emailNotifications.classUpdates} 
                  handleToggle={() => updateNotificationPreference('email', 'classUpdates', !emailNotifications.classUpdates)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Friends</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">New follower</span>
                <ToggleSwitch 
                  isOn={emailNotifications.newFollower} 
                  handleToggle={() => updateNotificationPreference('email', 'newFollower', !emailNotifications.newFollower)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Friend activity</span>
                <ToggleSwitch 
                  isOn={emailNotifications.friendActivity} 
                  handleToggle={() => updateNotificationPreference('email', 'friendActivity', !emailNotifications.friendActivity)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Referral updates</span>
                <ToggleSwitch 
                  isOn={emailNotifications.referralUpdates} 
                  handleToggle={() => updateNotificationPreference('email', 'referralUpdates', !emailNotifications.referralUpdates)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Marketing</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4">
                <div className="flex-1">
                  <span className="font-medium">Product updates, company notes, etc.</span>
                </div>
                <ToggleSwitch 
                  isOn={emailNotifications.marketing} 
                  handleToggle={() => updateNotificationPreference('email', 'marketing', !emailNotifications.marketing)} 
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile Notifications Tab */}
      {activeTab === 'mobile' && (
        <section className="p-4 space-y-6">
          <h2 className="text-xl font-bold">Mobile Notifications</h2>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Study</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Study Reminders</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.studyReminders} 
                  handleToggle={() => updateNotificationPreference('mobile', 'studyReminders', !mobileNotifications.studyReminders)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Practice notifications</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.practiceNotifications} 
                  handleToggle={() => updateNotificationPreference('mobile', 'practiceNotifications', !mobileNotifications.practiceNotifications)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Daily study reminders</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.dailyStudyReminders} 
                  handleToggle={() => updateNotificationPreference('mobile', 'dailyStudyReminders', !mobileNotifications.dailyStudyReminders)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Alerts</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Streak reminder</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.streakReminder} 
                  handleToggle={() => updateNotificationPreference('mobile', 'streakReminder', !mobileNotifications.streakReminder)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Level & Progress</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.levelProgress} 
                  handleToggle={() => updateNotificationPreference('mobile', 'levelProgress', !mobileNotifications.levelProgress)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Inactivity Reminder</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.inactivityReminder} 
                  handleToggle={() => updateNotificationPreference('mobile', 'inactivityReminder', !mobileNotifications.inactivityReminder)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Store Promotions</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.storePromotions} 
                  handleToggle={() => updateNotificationPreference('mobile', 'storePromotions', !mobileNotifications.storePromotions)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Class Updates</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.classUpdates} 
                  handleToggle={() => updateNotificationPreference('mobile', 'classUpdates', !mobileNotifications.classUpdates)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Friends</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">New follower</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.newFollower} 
                  handleToggle={() => updateNotificationPreference('mobile', 'newFollower', !mobileNotifications.newFollower)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">Friend activity</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.friendActivity} 
                  handleToggle={() => updateNotificationPreference('mobile', 'friendActivity', !mobileNotifications.friendActivity)} 
                />
              </div>
              <div className="flex justify-between items-center py-4 px-4">
                <span className="font-medium">Referral updates</span>
                <ToggleSwitch 
                  isOn={mobileNotifications.referralUpdates} 
                  handleToggle={() => updateNotificationPreference('mobile', 'referralUpdates', !mobileNotifications.referralUpdates)} 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Marketing</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center py-4 px-4">
                <div className="flex-1">
                  <span className="font-medium">Product updates, company notes, etc.</span>
                </div>
                <ToggleSwitch 
                  isOn={mobileNotifications.marketing} 
                  handleToggle={() => updateNotificationPreference('mobile', 'marketing', !mobileNotifications.marketing)} 
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Your Plan Tab */}
      {activeTab === 'plan' && (
        <section className="p-4 space-y-6">
          <h2 className="text-xl font-bold">Your Plan</h2>
          
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-blue-100">Perfect for getting started</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited flashcards
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Basic statistics
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Community access
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Upgrade to Pro
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Usage Statistics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary">Flashcards created</span>
                  <span className="font-medium">0 / Unlimited</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary">Storage used</span>
                  <span className="font-medium">0 MB / 100 MB</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Saving...
        </div>
      )}
    </div>
  );
};

export default PreferencesPage;
