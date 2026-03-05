import { Injectable, signal } from '@angular/core';
import { CustomRecipe } from '../models/custom-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CustomRecipeStorageService {
  private readonly DB_NAME = 'recipe-planner-db';
  private readonly STORE_NAME = 'custom-recipes';
  private readonly DB_VERSION = 1;
  private db = signal<IDBDatabase | null>(null);

  constructor() {
    this.initDB();
  }

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db.set(request.result);
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const objectStore = db.createObjectStore(this.STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true 
          });
          
          objectStore.createIndex('createdAt', 'createdAt', { unique: false });
          objectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
        }
      };
    });
  }

  async saveRecipe(recipe: Omit<CustomRecipe, 'id'>): Promise<number> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      
      const recipeToSave = {
        ...recipe,
        isCustom: true as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const request = store.add(recipeToSave);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        console.error('Failed to save recipe:', request.error);
        reject(request.error);
      };
    });
  }

  async updateRecipe(recipe: CustomRecipe): Promise<void> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      
      const recipeToUpdate = {
        ...recipe,
        updatedAt: new Date()
      };

      const request = store.put(recipeToUpdate);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to update recipe:', request.error);
        reject(request.error);
      };
    });
  }

  async getRecipe(id: number): Promise<CustomRecipe | null> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('Failed to get recipe:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllRecipes(): Promise<CustomRecipe[]> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Failed to get all recipes:', request.error);
        reject(request.error);
      };
    });
  }

  async deleteRecipe(id: number): Promise<void> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to delete recipe:', request.error);
        reject(request.error);
      };
    });
  }

  async clearAllRecipes(): Promise<void> {
    const database = this.db();
    if (!database) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to clear recipes:', request.error);
        reject(request.error);
      };
    });
  }
}
