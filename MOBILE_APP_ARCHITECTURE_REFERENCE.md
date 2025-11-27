# Mobile App Architecture Reference Guide

## Overview

This document provides a comprehensive reference for building scalable React Native mobile applications using modern best practices. It's based on a production-grade architecture that emphasizes type safety, clean code organization, and maintainable patterns.

---

## Table of Contents

1. [Tech Stack & Core Dependencies](#tech-stack--core-dependencies)
2. [Project Structure](#project-structure)
3. [Initial Setup Guide](#initial-setup-guide)
4. [Architecture Layers](#architecture-layers)
5. [State Management Strategy](#state-management-strategy)
6. [API Integration Patterns](#api-integration-patterns)
7. [Routing & Navigation](#routing--navigation)
8. [Authentication Implementation](#authentication-implementation)
9. [Component Patterns](#component-patterns)
10. [TypeScript Best Practices](#typescript-best-practices)
11. [Styling Guidelines](#styling-guidelines)
12. [Common Reusable Patterns](#common-reusable-patterns)
13. [Performance Optimization](#performance-optimization)
14. [Configuration Files](#configuration-files)
15. [Step-by-Step Implementation](#step-by-step-implementation)

---

## Tech Stack & Core Dependencies

### Framework & Core
```json
{
  "expo": "^52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.9",
  "typescript": "^5.3.3"
}
```

### Navigation
```json
{
  "expo-router": "~4.0.0"
}
```
**Purpose**: File-based routing system with type safety

### State Management
```json
{
  "zustand": "^5.0.2",
  "@tanstack/react-query": "^5.72.0"
}
```
**Purpose**:
- Zustand for client-side global state (workflows, UI state)
- React Query for server state (API data, caching, mutations)

### API & Networking
```json
{
  "axios": "^1.8.4"
}
```
**Purpose**: HTTP client with interceptor support for auth

### Storage
```json
{
  "@react-native-async-storage/async-storage": "^2.1.2"
}
```
**Purpose**: Persistent key-value storage for tokens and user data

### UI & Animations
```json
{
  "react-native-reanimated": "~3.16.0",
  "react-native-gesture-handler": "~2.20.0",
  "react-native-svg": "15.8.0",
  "react-native-svg-transformer": "^1.5.0",
  "@expo/vector-icons": "^14.0.0",
  "expo-blur": "~14.0.0"
}
```

### Expo Modules
```json
{
  "expo-font": "~13.0.0",
  "expo-splash-screen": "~0.29.0",
  "expo-status-bar": "~2.0.0",
  "expo-clipboard": "~7.0.0",
  "expo-document-picker": "~12.0.0",
  "expo-haptics": "~14.0.0"
}
```

### Development Tools
```json
{
  "@dev-plugins/react-query": "^0.0.14",
  "jest": "^29.7.0",
  "jest-expo": "^52.0.0",
  "@types/react": "~18.3.12"
}
```

---

## Project Structure

### Root Directory Organization
```
your-app/
├── app/                          # File-based routing (Expo Router)
│   ├── (auth)/                   # Authentication routes group
│   │   ├── _layout.tsx           # Auth layout (Stack navigation)
│   │   ├── login.tsx             # Login screen
│   │   ├── register.tsx          # Registration screen
│   │   └── index.tsx             # Auth landing page
│   ├── (app)/                    # Protected app routes group
│   │   ├── (role1)/              # Role-specific routes (e.g., student)
│   │   │   ├── _layout.tsx       # Tab navigation
│   │   │   ├── index.tsx         # Main screen
│   │   │   ├── feature1/         # Feature screens
│   │   │   │   ├── index.tsx
│   │   │   │   └── [id].tsx      # Dynamic route
│   │   │   └── feature2/
│   │   └── (role2)/              # Another role (e.g., teacher)
│   │       ├── _layout.tsx
│   │       └── index.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point with auth check
│
├── api/                          # API layer
│   ├── client.tsx                # Axios instance configuration
│   ├── api-provider.tsx          # React Query provider
│   ├── auth/                     # Auth endpoints
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── logout.tsx
│   ├── feature1/                 # Feature-specific endpoints
│   │   ├── get_items.tsx
│   │   ├── create_item.tsx
│   │   └── update_item.tsx
│   └── feature2/
│
├── components/                   # UI Components
│   ├── ui/                       # Base UI components
│   │   ├── index.tsx             # Barrel export
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Container.tsx
│   │   └── Card.tsx
│   ├── common/                   # Shared components
│   │   ├── LoadingIndicator.tsx
│   │   ├── ErrorIndicator.tsx
│   │   ├── BackButton.tsx
│   │   └── ActionModal.tsx
│   ├── role1/                    # Role-specific components
│   │   └── FeatureCard.tsx
│   └── role2/
│       └── DashboardCard.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.tsx
│   ├── useUserType.tsx
│   └── useCustomHook.tsx
│
├── store/                        # Zustand stores
│   ├── workflowStore.tsx
│   └── uiStore.tsx
│
├── types/                        # TypeScript definitions
│   ├── index.tsx                 # Barrel export
│   ├── auth.tsx
│   ├── feature1.tsx
│   └── feature2.tsx
│
├── utils/                        # Utility functions
│   ├── validation.tsx
│   ├── formatting.tsx
│   └── helpers.tsx
│
├── assets/                       # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── constants.ts                  # Global constants
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── metro.config.ts               # Metro bundler config
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

### Naming Conventions
- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`formatDate.tsx`)
- **Folders**: Lowercase with hyphens or camelCase (`feature-name` or `featureName`)
- **Route Groups**: Parentheses for organization `(auth)`, `(app)`
- **Dynamic Routes**: Square brackets `[id].tsx`

---

## Initial Setup Guide

### 1. Create New Expo Project
```bash
npx create-expo-app your-app-name --template blank-typescript
cd your-app-name
```

### 2. Install Core Dependencies
```bash
# Navigation
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# State Management
npm install zustand @tanstack/react-query

# API & Storage
npm install axios @react-native-async-storage/async-storage

# UI & Animations
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg

# Development Tools
npm install --save-dev @dev-plugins/react-query react-native-svg-transformer
```

### 3. Configure TypeScript
Create `tsconfig.json`:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 4. Update package.json
```json
{
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest --watch"
  }
}
```

### 5. Create Folder Structure
```bash
mkdir -p app api components/{ui,common} hooks store types utils assets/{fonts,icons,images}
```

---

## Architecture Layers

### Layer 1: Routes (app/)
**Purpose**: Define application screens and navigation structure

**Responsibilities**:
- Screen components
- Navigation layouts
- Route guards
- Parameter handling

**Rules**:
- Keep screens lean (delegate logic to hooks/API)
- Use layouts for shared navigation structure
- Group related routes with `()`

### Layer 2: API (api/)
**Purpose**: Handle all server communication

**Responsibilities**:
- HTTP client configuration
- API endpoint functions
- Request/response transformation
- Error handling

**Rules**:
- Pure async functions (no React hooks)
- Return typed data
- Handle errors consistently
- One file per endpoint

### Layer 3: Components (components/)
**Purpose**: Reusable UI building blocks

**Responsibilities**:
- Presentational components
- UI logic
- Styling
- User interactions

**Rules**:
- Single responsibility
- Accept props for customization
- Use TypeScript for props
- Include styles in same file

### Layer 4: Shared (hooks/, store/, types/, utils/)
**Purpose**: Cross-cutting concerns and utilities

**Responsibilities**:
- Custom React hooks
- Global state stores
- Type definitions
- Helper functions

**Rules**:
- Keep utilities pure
- Export types from centralized location
- Document complex hooks

---

## State Management Strategy

### Overview
Use **4 different state management approaches** based on the state type:

| State Type | Solution | Use Cases |
|------------|----------|-----------|
| Local UI State | React useState | Form inputs, modals, toggles |
| Global Client State | Zustand | Multi-step workflows, UI preferences |
| Server State | React Query | API data, caching |
| Persistent State | AsyncStorage | Auth tokens, user settings |

### 1. Local UI State (useState)

**When to Use**:
- Component-specific state
- Temporary UI state
- Form inputs within a single screen

**Example**:
```typescript
// app/(auth)/login.tsx
import { useState } from 'react';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <Input value={email} onChangeText={setEmail} />
            <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            />
        </View>
    );
}
```

### 2. Global Client State (Zustand)

**When to Use**:
- Multi-step forms/wizards
- Temporary data during workflows
- Global UI state (theme, preferences)

**Store Pattern**:
```typescript
// store/createWorkflowStore.tsx
import { create } from 'zustand';

type WorkflowStore = {
    step1Data: string | undefined;
    step2Data: number | undefined;
    setStep1Data: (data: string) => void;
    setStep2Data: (data: number) => void;
    reset: () => void;
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
    step1Data: undefined,
    step2Data: undefined,
    setStep1Data: (data: string) => set(() => ({ step1Data: data })),
    setStep2Data: (data: number) => set(() => ({ step2Data: data })),
    reset: () => set(() => ({
        step1Data: undefined,
        step2Data: undefined
    })),
}));
```

**Usage**:
```typescript
// In component
const { step1Data, setStep1Data, reset } = useWorkflowStore();

// Update state
setStep1Data('value');

// Read state
console.log(step1Data);

// Reset on cleanup
useEffect(() => {
    return () => reset();
}, []);
```

### 3. Server State (React Query)

**When to Use**:
- API data fetching
- Server-side data caching
- Optimistic updates
- Background refetching

**Setup Provider**:
```typescript
// api/api-provider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

export function APIProvider({ children }: { children: React.ReactNode }) {
    useReactQueryDevTools(queryClient);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
```

**Query Pattern**:
```typescript
// In component - Fetching data
import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/api/items/get_items';

const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
});

if (isLoading) return <LoadingIndicator />;
if (error) return <ErrorIndicator error={error.message} refetch={refetch} />;

return <ItemList items={data} />;
```

**Mutation Pattern**:
```typescript
// In component - Creating/updating data
import { useMutation } from '@tanstack/react-query';
import { createItem } from '@/api/items/create_item';

const { mutate: createItemMutation, isPending } = useMutation({
    mutationFn: createItem,
    onSuccess: (data) => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['items'] });
        // Navigate or show success
        router.push('/success');
    },
    onError: (error) => {
        // Handle error
        alert(error.message);
    }
});

// Trigger mutation
const handleCreate = () => {
    createItemMutation({ name: 'New Item', description: 'Details' });
};
```

### 4. Persistent State (AsyncStorage)

**When to Use**:
- Authentication tokens
- User preferences
- Offline data
- Session data

**Pattern**:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
await AsyncStorage.setItem('token', 'jwt_token_here');
await AsyncStorage.setItem('user', JSON.stringify(userObject));

// Retrieve data
const token = await AsyncStorage.getItem('token');
const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');

// Remove data
await AsyncStorage.removeItem('token');

// Clear all
await AsyncStorage.clear();
```

**Custom Hook Pattern**:
```typescript
// hooks/useAuth.tsx
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAuth();
    }, []);

    return isLoggedIn;
}
```

---

## API Integration Patterns

### Axios Client Configuration

**Create Axios Instance**:
```typescript
// api/client.tsx
import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Create instance with base config
export const client = axios.create({
    baseURL: 'https://your-api.com/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

client.interceptors.request.use(authRequestInterceptor);

// Response interceptor - Handle errors
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 - Unauthorized
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            router.push('/(auth)/login');
        }
        return Promise.reject(error);
    }
);
```

### API Function Pattern

**Structure**: One file per endpoint

```typescript
// api/items/get_items.tsx
import { client } from '@/api/client';
import { ItemSchema } from '@/types';

export const get_items = async (): Promise<ItemSchema[]> => {
    try {
        const response = await client({
            url: '/items',
            method: 'GET',
            params: {
                include: ['category', 'user'],
                sort: '-created_at'
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            `Failed to fetch items: ${error.message}`
        );
    }
};
```

```typescript
// api/items/create_item.tsx
import { client } from '@/api/client';
import { CreateItemSchema, ItemSchema } from '@/types';

export const create_item = async (
    body: CreateItemSchema
): Promise<ItemSchema> => {
    try {
        const response = await client({
            url: '/items',
            method: 'POST',
            data: body,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to create item'
        );
    }
};
```

```typescript
// api/items/update_item.tsx
import { client } from '@/api/client';
import { UpdateItemSchema, ItemSchema } from '@/types';

export const update_item = async (
    id: number,
    body: UpdateItemSchema
): Promise<ItemSchema> => {
    try {
        const response = await client({
            url: `/items/${id}`,
            method: 'PUT',
            data: body,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to update item'
        );
    }
};
```

```typescript
// api/items/delete_item.tsx
import { client } from '@/api/client';

export const delete_item = async (id: number): Promise<void> => {
    try {
        await client({
            url: `/items/${id}`,
            method: 'DELETE',
        });
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to delete item'
        );
    }
};
```

### File Upload Pattern

```typescript
// api/items/upload_file.tsx
import { client } from '@/api/client';

interface UploadFileBody {
    fileUri: string;
    fileName: string;
    additionalData?: string;
}

export const upload_file = async (body: UploadFileBody) => {
    const fd = new FormData();

    // Append file
    fd.append('file', {
        uri: body.fileUri,
        name: body.fileName,
        type: 'application/pdf', // or detect from fileUri
    } as any);

    // Append additional data
    if (body.additionalData) {
        fd.append('data', body.additionalData);
    }

    try {
        const response = await client({
            url: '/upload',
            method: 'POST',
            data: fd,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Upload failed');
    }
};
```

### Usage in Components

**Query Example**:
```typescript
// app/(app)/items/index.tsx
import { useQuery } from '@tanstack/react-query';
import { get_items } from '@/api/items/get_items';

export default function ItemsScreen() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['items'],
        queryFn: get_items,
    });

    if (isLoading) return <LoadingIndicator />;
    if (error) return <ErrorIndicator error={error.message} refetch={refetch} />;

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ItemCard item={item} />}
        />
    );
}
```

**Mutation Example**:
```typescript
// app/(app)/items/create.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { create_item } from '@/api/items/create_item';
import { queryClient } from '@/api/api-provider';

export default function CreateItemScreen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { mutate: createItem, isPending } = useMutation({
        mutationFn: create_item,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            router.back();
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    const handleSubmit = () => {
        createItem({ name, description });
    };

    return (
        <Container>
            <Input value={name} onChangeText={setName} placeholder="Name" />
            <Input value={description} onChangeText={setDescription} placeholder="Description" />
            <Button onPress={handleSubmit} disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Item'}
            </Button>
        </Container>
    );
}
```

---

## Routing & Navigation

### File-Based Routing with Expo Router

**Route Mapping**:
```
app/
├── index.tsx                  → /
├── about.tsx                  → /about
├── (auth)/
│   ├── login.tsx              → /login
│   └── register.tsx           → /register
├── (app)/
│   ├── home.tsx               → /home
│   └── profile/
│       ├── index.tsx          → /profile
│       └── [id].tsx           → /profile/:id
```

### Root Layout

```typescript
// app/_layout.tsx
import { Stack, Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { APIProvider } from '@/api/api-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
        'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) return null;

    return (
        <APIProvider>
            <Slot />
        </APIProvider>
    );
}
```

### Route Groups

**Auth Layout** (Stack Navigation):
```typescript
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
```

**App Layout** (Tab Navigation):
```typescript
// app/(app)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
            {/* Hidden tab (detail screen) */}
            <Tabs.Screen
                name="details"
                options={{ href: null }}
            />
        </Tabs>
    );
}
```

### Navigation Methods

**Programmatic Navigation**:
```typescript
import { router } from 'expo-router';

// Navigate to route
router.push('/profile');

// Navigate with params
router.push({
    pathname: '/profile/[id]',
    params: { id: '123' }
});

// Go back
router.back();

// Replace current route
router.replace('/login');

// Navigate to nested route
router.push('/(app)/home');
```

**Declarative Navigation**:
```typescript
import { Link } from 'expo-router';

<Link href="/profile">Go to Profile</Link>

<Link href={{
    pathname: '/profile/[id]',
    params: { id: '123' }
}}>
    View Profile
</Link>
```

### Dynamic Routes

```typescript
// app/profile/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function ProfileDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <Text>Profile ID: {id}</Text>;
}
```

### Route Guards

```typescript
// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
    const isLoggedIn = useAuth();

    // Loading state
    if (isLoggedIn === null) {
        return <LoadingIndicator />;
    }

    return <Redirect href={isLoggedIn ? '/(app)/home' : '/(auth)/login'} />;
}
```

### Role-Based Routing

```typescript
// app/(app)/index.tsx
import { Redirect } from 'expo-router';
import { useUserType } from '@/hooks/useUserType';

export default function AppIndex() {
    const userType = useUserType();

    if (!userType) return <LoadingIndicator />;

    // Redirect based on role
    if (userType === 'admin') {
        return <Redirect href="/(app)/(admin)/dashboard" />;
    }

    return <Redirect href="/(app)/(user)/home" />;
}
```

---

## Authentication Implementation

### Complete Auth Flow

**1. Login API Function**:
```typescript
// api/auth/login.tsx
import { client } from '@/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginSchema {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        type: 'admin' | 'user';
    };
}

export const login = async (body: LoginSchema): Promise<LoginResponse> => {
    try {
        const response = await client({
            url: '/auth/login',
            method: 'POST',
            data: body,
        });

        // Store token and user type
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('type', response.data.user.type);

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            'Login failed. Please check your credentials.'
        );
    }
};
```

**2. Register API Function**:
```typescript
// api/auth/register.tsx
import { client } from '@/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RegisterSchema {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    type: 'admin' | 'user';
}

export const register = async (body: RegisterSchema) => {
    try {
        const response = await client({
            url: '/auth/register',
            method: 'POST',
            data: body,
        });

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('type', response.data.user.type);

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            'Registration failed.'
        );
    }
};
```

**3. Logout API Function**:
```typescript
// api/auth/logout.tsx
import { client } from '@/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
    try {
        await client({
            url: '/auth/logout',
            method: 'POST',
        });
    } catch (error) {
        // Logout anyway
    } finally {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('type');
    }
};
```

**4. useAuth Hook**:
```typescript
// hooks/useAuth.tsx
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setIsLoggedIn(!!token);
            } catch {
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    return isLoggedIn;
}
```

**5. useUserType Hook**:
```typescript
// hooks/useUserType.tsx
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUserType() {
    const [type, setType] = useState<string | null>(null);

    useEffect(() => {
        const getUserType = async () => {
            try {
                const userType = await AsyncStorage.getItem('type');
                setType(userType);
            } catch {
                setType(null);
            }
        };

        getUserType();
    }, []);

    return type;
}
```

**6. Login Screen**:
```typescript
// app/(auth)/login.tsx
import { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth/login';
import { Button, Input, Container } from '@/components/ui';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            router.push('/(app)');
        },
        onError: (err: Error) => {
            setError(err.message);
        }
    });

    const handleLogin = () => {
        setError(null);
        loginMutation({ email, password });
    };

    return (
        <Container>
            <Text style={styles.title}>Login</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button onPress={handleLogin} disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
        </Container>
    );
}
```

**7. Logout Implementation**:
```typescript
// In any component
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/auth/logout';
import { router } from 'expo-router';

const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        router.replace('/(auth)/login');
    }
});

const handleLogout = () => {
    logoutMutation();
};
```

---

## Component Patterns

### Base UI Components

**Button Component**:
```typescript
// components/ui/Button.tsx
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    style?: ViewStyle;
}

export default function Button({
    children,
    onPress,
    disabled = false,
    variant = 'primary',
    style
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                styles[variant],
                disabled && styles.disabled,
                style
            ]}
        >
            <Text style={[
                styles.text,
                disabled && styles.disabledText
            ]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    secondary: {
        backgroundColor: '#8E8E93',
    },
    danger: {
        backgroundColor: '#FF3B30',
    },
    disabled: {
        backgroundColor: '#C7C7CC',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledText: {
        color: '#8E8E93',
    },
});
```

**Input Component**:
```typescript
// components/ui/Input.tsx
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error && styles.inputError,
                    style
                ]}
                placeholderTextColor="#8E8E93"
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#000000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#C7C7CC',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    error: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
});
```

**Container Component**:
```typescript
// components/ui/Container.tsx
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
    useSafeArea?: boolean;
}

export default function Container({
    children,
    style,
    useSafeArea = true
}: ContainerProps) {
    const Wrapper = useSafeArea ? SafeAreaView : View;

    return (
        <Wrapper style={[styles.container, style]}>
            {children}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        padding: 16,
    },
});
```

**Card Component**:
```typescript
// components/ui/Card.tsx
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
```

**Barrel Export**:
```typescript
// components/ui/index.tsx
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Container } from './Container';
export { default as Card } from './Card';
```

### Common Components

**Loading Indicator**:
```typescript
// components/common/LoadingIndicator.tsx
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingIndicator() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
    },
});
```

**Error Indicator**:
```typescript
// components/common/ErrorIndicator.tsx
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useState } from 'react';

interface ErrorIndicatorProps {
    error: string;
    refetch: () => void;
}

export default function ErrorIndicator({ error, refetch }: ErrorIndicatorProps) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={styles.error}>{error}</Text>
            <Text style={styles.hint}>Pull down to retry</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    error: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 8,
    },
    hint: {
        fontSize: 14,
        color: '#8E8E93',
    },
});
```

**Action Modal**:
```typescript
// components/common/ActionModal.tsx
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui';

interface ActionModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function ActionModal({
    visible,
    onClose,
    title,
    description,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}: ActionModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.buttons}>
                        <Button
                            onPress={onClose}
                            variant="secondary"
                            style={styles.button}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onPress={() => {
                                onConfirm();
                                onClose();
                            }}
                            variant="danger"
                            style={styles.button}
                        >
                            {confirmText}
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#8E8E93',
        marginBottom: 24,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
    },
});
```

---

## TypeScript Best Practices

### Type Organization

**Centralized Type Definitions**:
```typescript
// types/auth.tsx
export interface User {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'user';
    created_at: string;
}

export interface LoginSchema {
    email: string;
    password: string;
}

export interface RegisterSchema {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    type: 'admin' | 'user';
}

export interface AuthResponse {
    token: string;
    user: User;
}
```

```typescript
// types/item.tsx
export interface Item {
    id: number;
    name: string;
    description: string;
    category_id: number;
    category?: Category;
    user_id: number;
    user?: User;
    created_at: string;
    updated_at: string;
}

export interface CreateItemSchema {
    name: string;
    description: string;
    category_id: number;
}

export interface UpdateItemSchema {
    name?: string;
    description?: string;
    category_id?: number;
}

export interface Category {
    id: number;
    name: string;
}
```

```typescript
// types/index.tsx - Barrel export
export * from './auth';
export * from './item';
```

### Component Props Typing

```typescript
// Inline props
interface CardProps {
    title: string;
    description?: string;
    onPress: () => void;
    children?: React.ReactNode;
}

export default function Card({ title, description, onPress, children }: CardProps) {
    // ...
}
```

```typescript
// Extending native props
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary';
    loading?: boolean;
}

export default function Button({ variant = 'primary', loading, ...props }: ButtonProps) {
    // ...
}
```

### API Response Typing

```typescript
// Typed API function
export const getItems = async (): Promise<Item[]> => {
    const response = await client.get<Item[]>('/items');
    return response.data;
};

// Typed mutation
export const createItem = async (body: CreateItemSchema): Promise<Item> => {
    const response = await client.post<Item>('/items', body);
    return response.data;
};
```

### Store Typing

```typescript
// Zustand store with types
import { create } from 'zustand';

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
```

### Utility Function Typing

```typescript
// utils/validation.tsx
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
```

---

## Styling Guidelines

### StyleSheet Pattern

**Always use StyleSheet.create**:
```typescript
import { View, Text, StyleSheet } from 'react-native';

export default function Component() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Title</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
    },
});
```

### Conditional Styles

```typescript
// Array syntax for conditional styles
<View style={[
    styles.button,
    disabled && styles.disabledButton,
    variant === 'primary' && styles.primaryButton,
]}>
```

### Design System Constants

```typescript
// constants.ts
export const COLORS = {
    primary: '#007AFF',
    secondary: '#8E8E93',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C7C7CC',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
};

export const BORDER_RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
};
```

**Usage**:
```typescript
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

const styles = StyleSheet.create({
    container: {
        padding: SPACING.md,
        backgroundColor: COLORS.background,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        color: COLORS.text,
    },
});
```

### Custom Fonts

**Load Fonts**:
```typescript
// app/_layout.tsx
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
});
```

**Use in Styles**:
```typescript
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
    },
});
```

---

## Common Reusable Patterns

### Pull to Refresh

```typescript
import { FlatList, RefreshControl } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function ListScreen() {
    const { data, refetch } = useQuery({ queryKey: ['items'], queryFn: getItems });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ItemCard item={item} />}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
}
```

### Empty State

```typescript
<FlatList
    data={data}
    renderItem={({ item }) => <ItemCard item={item} />}
    ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
        </View>
    )}
/>
```

### Form Validation

```typescript
// utils/validation.tsx
export interface ValidationError {
    field: string;
    message: string;
}

export const validateForm = (data: any): { isValid: boolean; errors: ValidationError[] } => {
    const errors: ValidationError[] = [];

    if (!data.name || data.name.trim() === '') {
        errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!data.email || !validateEmail(data.email)) {
        errors.push({ field: 'email', message: 'Valid email is required' });
    }

    if (!data.password || data.password.length < 8) {
        errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
```

**Usage**:
```typescript
const handleSubmit = () => {
    const { isValid, errors } = validateForm({ name, email, password });

    if (!isValid) {
        setFormErrors(errors);
        return;
    }

    // Submit form
    createMutation({ name, email, password });
};
```

### Multi-Step Form

**Store**:
```typescript
// store/multiStepFormStore.tsx
import { create } from 'zustand';

interface FormData {
    step1: { name: string } | null;
    step2: { email: string; phone: string } | null;
    step3: { address: string } | null;
}

interface MultiStepFormStore extends FormData {
    setStep1: (data: FormData['step1']) => void;
    setStep2: (data: FormData['step2']) => void;
    setStep3: (data: FormData['step3']) => void;
    reset: () => void;
}

export const useMultiStepFormStore = create<MultiStepFormStore>((set) => ({
    step1: null,
    step2: null,
    step3: null,
    setStep1: (data) => set({ step1: data }),
    setStep2: (data) => set({ step2: data }),
    setStep3: (data) => set({ step3: data }),
    reset: () => set({ step1: null, step2: null, step3: null }),
}));
```

**Screen**:
```typescript
// app/form/index.tsx
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useMultiStepFormStore } from '@/store/multiStepFormStore';
import Step1 from '@/components/form/Step1';
import Step2 from '@/components/form/Step2';
import Step3 from '@/components/form/Step3';

export default function MultiStepFormScreen() {
    const [currentStep, setCurrentStep] = useState(1);
    const { reset } = useMultiStepFormStore();

    // Reset on screen leave
    useFocusEffect(
        useCallback(() => {
            return () => {
                setCurrentStep(1);
                reset();
            };
        }, [])
    );

    return (
        <Container>
            <StepIndicator current={currentStep} total={3} />

            {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
            {currentStep === 2 && (
                <Step2
                    onNext={() => setCurrentStep(3)}
                    onBack={() => setCurrentStep(1)}
                />
            )}
            {currentStep === 3 && <Step3 onBack={() => setCurrentStep(2)} />}
        </Container>
    );
}
```

### Clipboard Copy

```typescript
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await Clipboard.setStringAsync(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button onPress={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
        </Button>
    );
}
```

### File Picker

```typescript
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export default function FilePickerButton() {
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        });

        if (!result.canceled && result.assets[0]) {
            setFile(result.assets[0]);
        }
    };

    return (
        <View>
            <Button onPress={pickFile}>Pick PDF</Button>
            {file && <Text>Selected: {file.name}</Text>}
        </View>
    );
}
```

### Haptic Feedback

```typescript
import * as Haptics from 'expo-haptics';

// On button press
const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // ... rest of logic
};

// On success
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// On error
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

---

## Performance Optimization

### 1. FlatList Optimization

```typescript
import { FlatList } from 'react-native';
import { memo } from 'react';

// Memoize list item
const ItemCard = memo(({ item }: { item: Item }) => {
    return (
        <View>
            <Text>{item.name}</Text>
        </View>
    );
});

export default function ListScreen() {
    const { data } = useQuery({ queryKey: ['items'], queryFn: getItems });

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ItemCard item={item} />}
            // Performance optimizations
            removeClippedSubviews
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={10}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
        />
    );
}
```

### 2. React Query Optimization

```typescript
// Stale time and cache time
const { data } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
});

// Prefetching
import { queryClient } from '@/api/api-provider';

const prefetchItems = () => {
    queryClient.prefetchQuery({
        queryKey: ['items'],
        queryFn: getItems,
    });
};

// Optimistic updates
const { mutate } = useMutation({
    mutationFn: updateItem,
    onMutate: async (newItem) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['items'] });

        // Snapshot previous value
        const previousItems = queryClient.getQueryData(['items']);

        // Optimistically update
        queryClient.setQueryData(['items'], (old: any) =>
            old.map((item: any) =>
                item.id === newItem.id ? newItem : item
            )
        );

        return { previousItems };
    },
    onError: (err, newItem, context) => {
        // Rollback on error
        queryClient.setQueryData(['items'], context?.previousItems);
    },
    onSettled: () => {
        // Refetch after mutation
        queryClient.invalidateQueries({ queryKey: ['items'] });
    },
});
```

### 3. Image Optimization

```typescript
import { Image } from 'react-native';

<Image
    source={{ uri: imageUrl }}
    style={{ width: 200, height: 200 }}
    resizeMode="cover"
    // Fast image replacement
    defaultSource={require('@/assets/placeholder.png')}
/>
```

### 4. Reanimated for Animations

```typescript
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

export default function AnimatedComponent() {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handlePress = () => {
        offset.value = withSpring(100);
    };

    return (
        <Animated.View style={animatedStyles}>
            <Button onPress={handlePress}>Animate</Button>
        </Animated.View>
    );
}
```

---

## Configuration Files

### app.json

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.yourapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "your-project-id"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    }
  }
}
```

### eas.json

```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "API_URL": "https://dev-api.yourapp.com"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "API_URL": "https://staging-api.yourapp.com"
      }
    },
    "production": {
      "env": {
        "API_URL": "https://api.yourapp.com"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### metro.config.ts (SVG Support)

```typescript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// SVG Transformer
const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext: string) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
```

**Usage**:
```typescript
import Logo from '@/assets/logo.svg';

<Logo width={100} height={100} />
```

### tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### package.json Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest --watch",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Step-by-Step Implementation

### 1. Initialize Project

```bash
# Create new Expo app
npx create-expo-app my-app --template blank-typescript
cd my-app

# Install dependencies
npm install zustand @tanstack/react-query axios @react-native-async-storage/async-storage
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg

# Development tools
npm install --save-dev @dev-plugins/react-query react-native-svg-transformer
```

### 2. Configure TypeScript

Create `tsconfig.json`:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

### 3. Update package.json

```json
{
  "main": "expo-router/entry"
}
```

### 4. Create Folder Structure

```bash
mkdir -p app/{(auth),(app)} api components/{ui,common} hooks store types utils assets/{fonts,icons,images}
```

### 5. Setup API Client

Create `api/client.tsx` with axios instance and interceptors (see API Integration section)

### 6. Setup React Query Provider

Create `api/api-provider.tsx` (see State Management section)

### 7. Create Root Layout

Create `app/_layout.tsx`:
```typescript
import { Slot } from 'expo-router';
import { APIProvider } from '@/api/api-provider';

export default function RootLayout() {
    return (
        <APIProvider>
            <Slot />
        </APIProvider>
    );
}
```

### 8. Create Auth Hooks

Create `hooks/useAuth.tsx` and `hooks/useUserType.tsx` (see Authentication section)

### 9. Create Route Guards

Create `app/index.tsx`:
```typescript
import { Redirect } from 'expo-router';
import useAuth from '@/hooks/useAuth';

export default function Index() {
    const isLoggedIn = useAuth();
    if (isLoggedIn === null) return null;
    return <Redirect href={isLoggedIn ? '/(app)' : '/(auth)/login'} />;
}
```

### 10. Create Auth Screens

- `app/(auth)/_layout.tsx` - Stack layout
- `app/(auth)/login.tsx` - Login screen
- `app/(auth)/register.tsx` - Register screen

### 11. Create App Screens

- `app/(app)/_layout.tsx` - Tab layout
- `app/(app)/index.tsx` - Role-based redirect
- `app/(app)/(role)/...` - Feature screens

### 12. Create Base UI Components

- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Container.tsx`
- `components/ui/Card.tsx`
- `components/ui/index.tsx` - Barrel export

### 13. Create Common Components

- `components/common/LoadingIndicator.tsx`
- `components/common/ErrorIndicator.tsx`
- `components/common/ActionModal.tsx`

### 14. Create Type Definitions

- `types/auth.tsx`
- `types/[feature].tsx`
- `types/index.tsx` - Barrel export

### 15. Create API Functions

- `api/auth/login.tsx`
- `api/auth/register.tsx`
- `api/[feature]/[action].tsx`

### 16. Build Features

For each feature:
1. Define types in `types/`
2. Create API functions in `api/`
3. Create screens in `app/`
4. Create feature components in `components/`
5. Create stores if needed in `store/`
6. Create hooks if needed in `hooks/`

---

## Best Practices Summary

### Do's ✅
- Use TypeScript strictly
- Keep components small and focused
- Use React Query for server state
- Use Zustand for global client state
- Validate forms before submission
- Handle loading and error states
- Use FlatList for long lists
- Memoize expensive components
- Use path aliases (@/...)
- Follow consistent naming conventions
- Organize by feature
- Use barrel exports for clean imports
- Keep API functions pure
- Use StyleSheet.create for styles
- Load custom fonts at app start
- Use interceptors for auth

### Don'ts ❌
- Don't put business logic in components
- Don't use inline styles (except dynamic)
- Don't forget error handling
- Don't skip loading states
- Don't hardcode values (use constants)
- Don't nest routes too deeply
- Don't bypass type safety with `any`
- Don't forget to cleanup (useEffect)
- Don't use ScrollView for large lists
- Don't store sensitive data unencrypted
- Don't forget accessibility
- Don't ignore TypeScript errors

---

## Customization Guide

When adapting this architecture to your project:

### 1. Update API URL
```typescript
// constants.ts
export const API_URL = 'https://your-api.com/api';
```

### 2. Customize Color Scheme
```typescript
// constants.ts
export const COLORS = {
    primary: '#YourColor',
    // ... customize all colors
};
```

### 3. Add Your Features
```bash
# Create feature structure
mkdir -p app/(app)/your-feature api/your-feature components/your-feature types

# Add types
# Create types/your-feature.tsx

# Add API functions
# Create api/your-feature/get_items.tsx, etc.

# Add screens
# Create app/(app)/your-feature/index.tsx

# Add components
# Create components/your-feature/YourComponent.tsx
```

### 4. Adjust Authentication
- Modify auth types in `types/auth.tsx`
- Update login/register API functions
- Adjust token storage strategy
- Update role-based routing

### 5. Configure Build
- Update `app.json` with your app details
- Set up `eas.json` for your environments
- Configure bundle identifiers

### 6. Add Custom Fonts
```typescript
// app/_layout.tsx
const [loaded] = useFonts({
    'YourFont-Regular': require('../assets/fonts/YourFont-Regular.ttf'),
});
```

---

## Conclusion

This architecture provides a solid foundation for building scalable, maintainable React Native applications. It emphasizes:

- **Type Safety**: Comprehensive TypeScript usage
- **Clean Architecture**: Clear separation of concerns
- **Modern Patterns**: React Query, Zustand, Expo Router
- **Developer Experience**: Hot reloading, dev tools, typed routes
- **Performance**: Optimized rendering, caching, animations
- **Maintainability**: Consistent patterns, organized structure

Use this as a reference to build your application, adapting patterns and structures to fit your specific requirements while maintaining the core principles of clean, scalable architecture.
