/**
 * Exam Module Initialization
 * Registers all layouts in the registries
 * Call this once at app startup
 */

import { layoutRegistry, resultLayoutRegistry } from './registry';
import { Layout1, Layout2, Layout3 } from './layouts/test';
import { ResultLayout1, ResultLayout2, ResultLayout3 } from './layouts/result';

export function initializeExamModule() {
  // Register test layouts
  layoutRegistry.register('layout_1', Layout1);
  layoutRegistry.register('layout_2', Layout2);
  layoutRegistry.register('layout_3', Layout3);

  // Register result layouts
  resultLayoutRegistry.register('result_layout_1', ResultLayout1);
  resultLayoutRegistry.register('result_layout_2', ResultLayout2);
  resultLayoutRegistry.register('result_layout_3', ResultLayout3);

  console.log('[Exam Module] Initialized with', {
    testLayouts: Object.keys(layoutRegistry.getAll()),
    resultLayouts: Object.keys(resultLayoutRegistry.getAll()),
  });
}
