const COMMANDS = {
  whoami: 'Trusha Khachariya — AI/ML Engineer · Ahmedabad, India',
  'ls projects/': 'aurium-ai/  botiq-ai/  docmind/  docwise/  hire-framework/',
  'cat status.txt': 'Open to opportunities. Currently building Aurium AI by night.',
  help: 'Commands: whoami · ls projects/ · cat status.txt · clear',
  clear: '__CLEAR__',
};

export function initInteractiveTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-interactive-output');
  const terminal = document.querySelector('.terminal-interactive');

  if (!input || !output || !terminal) {
    return;
  }

  function appendLine(text, className = 't-line-info') {
    const line = document.createElement('div');
    line.className = `t-line ${className}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function appendCommand(cmd) {
    const line = document.createElement('div');
    line.className = 't-line';
    line.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd">${cmd}</span>`;
    output.appendChild(line);
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) {
      return;
    }

    appendCommand(raw);

    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      appendLine(`> ${response}`, 't-line-ok');
      return;
    }

    appendLine(`command not found: ${raw}. Type "help" for available commands.`, 't-line-info');
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.value;
      input.value = '';
      runCommand(value);
    }
  });

  terminal.addEventListener('click', () => input.focus());

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        appendLine('Type "help" to explore. Try: whoami · ls projects/', 't-line-info');
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(terminal);
}
