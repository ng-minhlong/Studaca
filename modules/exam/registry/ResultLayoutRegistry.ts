/**
 * Result Layout Registry
 * Central registry for result layouts
 */

import React from 'react';

export interface ResultLayoutRegistry {
  register(id: string, component: React.ComponentType<any>): void;
  get(id: string): React.ComponentType<any> | null;
  has(id: string): boolean;
  getAll(): Record<string, React.ComponentType<any>>;
}

class ResultLayoutRegistryImpl implements ResultLayoutRegistry {
  private layouts: Map<string, React.ComponentType<any>> = new Map();

  register(id: string, component: React.ComponentType<any>): void {
    if (this.layouts.has(id)) {
      console.warn(`Result layout ${id} is already registered, overwriting...`);
    }
    this.layouts.set(id, component);
  }

  get(id: string): React.ComponentType<any> | null {
    return this.layouts.get(id) || null;
  }

  has(id: string): boolean {
    return this.layouts.has(id);
  }

  getAll(): Record<string, React.ComponentType<any>> {
    return Object.fromEntries(this.layouts);
  }
}

export const resultLayoutRegistry = new ResultLayoutRegistryImpl();
