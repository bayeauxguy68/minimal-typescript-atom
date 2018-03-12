import MinimalTypescriptView from './minimal-typescript-view';
import createOpenerFor from './pane-item';
import { CompositeDisposable, AtomEnvironment } from 'atom';

export class MinimalTypescriptPackage {
  subs: CompositeDisposable;

  constructor(private readonly atome: AtomEnvironment) {
    this.subs = new CompositeDisposable();
    this.subs.add(
      this.atome.commands.add('atom-workspace', {
        'minimal-typescript:open': () => {
          console.log('event triggered');
          this.atome.workspace.open('minimal-typescript://hello-world');
        }
      }),
      this.atome.workspace.addOpener(
        createOpenerFor(
          'minimal-typescript://hello-world',
          MinimalTypescriptView,
          {message: 'hello'}
        ),
      )
    );
  }

  dispose() {
    this.subs.dispose();
  }
}

let currentPackage: MinimalTypescriptPackage | null = null;

export function activate() {
  console.log('package activating');
  currentPackage = new MinimalTypescriptPackage(atom);
};

export function deactivate() {
  if (currentPackage !== null) {
    (currentPackage as MinimalTypescriptPackage).dispose();
    currentPackage = null;
  }
}
