import { inject } from '@angular/core';
import { CanActivateChildFn, Router, ActivatedRouteSnapshot } from '@angular/router';

let wasInitialNavigationDone = false;

/**
 * Checks if the initial navigation has been done and redirects to the first step if not.
 */
export const editRedirectGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  if (wasInitialNavigationDone) {
    return true;
  }
  wasInitialNavigationDone = true;


  /**
   * Checks if the initial navigation is done.
   * If not, sets the flag and redirects to the first step.
   */
  const findStepParam = (snapshot: ActivatedRouteSnapshot): number | null => {
    if (snapshot.paramMap.has('step')) {
      return Number(snapshot.paramMap.get('step'));
    }
    for (const child of snapshot.children) {
      const result = findStepParam(child);
      if (result !== null) return result;
    }
    return null;
  };

  const step = findStepParam(state.root);
  if (step !== 0) {
    const childPath = route.children[0].routeConfig?.path ?? '';
    router.navigate(['/edit', 0, childPath]);
    return false;
  }
  return true;
};
