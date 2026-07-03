import { Theme } from './settings/types';
import { CoreCapabilities } from './components/generated/CoreCapabilities';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <main className="w-full min-h-screen bg-[#111111]">
      <CoreCapabilities />
    </main>
  );
}

export default App;
