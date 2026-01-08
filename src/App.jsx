import React, { useState, useEffect } from 'react';
import { Heart, Code, Terminal, Sparkles, Cat } from 'lucide-react';

const DebugMyHeartGame = () => {
  const [gameState, setGameState] = useState('intro');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [catDialogue, setCatDialogue] = useState(null);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHelpOffer, setShowHelpOffer] = useState(false);

  // Oye Dani, si estás leyendo esto en el código significa que eres tan curiosa como pensaba jajaja
  // Este juego lo hice con ayuda de una IA porque soy un desastre programando, pero el amor es 100% mío
  // Espero que te haya gustado tanto como a mí me gustó verlo cobrar vida
  
  const levels = [
    {
      title: "Bug #1: Error de Inicialización",
      code: `function iniciarDia() {
  let felicidad = 0;
  let amor = undefined;
  return felicidad + amor;
}`,
      solution: "Infinity",
      hint: "El amor nunca debería ser undefined... ¿qué tal algo infinito? (=^･ω･^=)",
      message: "Cada día contigo es un regalo. Gracias por existir, preciosa.",
    },
    {
      title: "Bug #2: Loop Infinito Detectado", 
      code: `while (true) {
  pensar_en_ti();
  sonreir();
  break;
}`,
      solution: "infinito",
      hint: "¿Y si algunos loops infinitos son... perfectos tal como están? (=´ω｀=)",
      message: "Pienso en ti constantemente. En tus risas, en tus gestos, en todo lo que eres.",
    },
    {
      title: "Bug #3: Excepción no Controlada",
      code: `try {
  celebrar_cumpleaños();
  dar_abrazos();
} catch (error) {
  console.log("Error: falta algo...");
}`,
      solution: "amor",
      hint: "Los mejores regalos vienen del corazón... (=^-ω-^=)",
      message: "Me encanta cada momento íntimo que compartimos. Los secretos, las risas, bailar en la calle... todo.",
    },
    {
      title: "Bug #4: Return Statement Incorrecto",
      code: `function futuro_juntas() {
  let aventuras = [];
  let recuerdos = [];
  return null;
}`,
      solution: "todo",
      hint: "El futuro tiene espacio para todo lo infinito... (=ＴェＴ=)",
      message: "Quiero seguir creando más momentos especiales contigo. Eres lo mejor que me ha pasado.",
    }
  ];

  // Si lees esto: sabes que eres mi persona favorita en todo el mundo, verdad?
  
  useEffect(() => {
    if (gameState === 'intro') {
      const text = "Inicializando sistema...\n> BIENVENIDA DANI\n> Feliz Cumpleaños\n> Sistema corrupto detectado...\n> Se necesita que una chica muy guapa y con mucho swag lo resuelva...";
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setTerminalText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 100);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const confirmIdentity = (isHer) => {
    if (isHer) {
      setCatDialogue("Ya decía yo, si eres muy swag y muy guapa (=^･ω･^=)");
      setTimeout(() => {
        setGameState('playing');
        setCatDialogue(null);
      }, 2500);
    } else {
      setCatDialogue("Venga no seas mentirosilla (=｀ェ´=)");
      setTimeout(() => setCatDialogue(null), 2000);
    }
  };

  const handleSubmit = () => {
    const level = levels[currentLevel];
    const correct = userInput.toLowerCase().includes(level.solution.toLowerCase());
    
    if (correct) {
      setScore(score + 25);
      setCatDialogue("¡Correcto! Eres increíble (=^･ω･^=)");
      setAttempts(0);
      setShowHelpOffer(false);
      setUserInput('');
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
        } else {
          setGameState('finale');
        }
        setCatDialogue(null);
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowHelpOffer(true);
      } else {
        setCatDialogue("Mmm... casi casi (=｀ω´=)");
        setTimeout(() => setCatDialogue(null), 1500);
      }
    }
  };

  const handleHelpResponse = (needsHelp) => {
    if (needsHelp) {
      setCatDialogue(levels[currentLevel].hint);
    } else {
      setCatDialogue("¡Esa es la actitud! Sé que puedes (=^･ェ･^=)");
    }
    setShowHelpOffer(false);
    setAttempts(0);
    setTimeout(() => setCatDialogue(null), 3000);
  };

  // Tu sonrisa es mi parte favorita del día, todos los días

  const showCatInteraction = (type) => {
    if (type === 'hello') {
      setCatDialogue("Hola Dani! Feliz cumple :3");
    } else if (type === 'help') {
      setCatDialogue(levels[currentLevel].hint);
    }
    setShowCatMenu(false);
    setTimeout(() => setCatDialogue(null), 4000);
  };

  const IntroScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className={`relative z-10 text-center ${glitchEffect ? 'animate-pulse' : ''}`}>
        <Heart className="w-24 h-24 mx-auto mb-6 text-cyan-400 animate-pulse drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]" style={{fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif'}}>
          DEBUG MY HEART
        </h1>
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className="text-4xl text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]" style={{fontFamily: 'Arial Rounded MT Bold, Arial, sans-serif'}}>
            Feliz Cumpleaños Daniela
          </h2>
        </div>
        <div className="bg-black/90 border-2 border-cyan-500/70 rounded-lg p-6 max-w-2xl mb-8 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
          <Terminal className="w-12 h-12 mx-auto mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          <pre className="text-left font-mono text-sm whitespace-pre-wrap text-cyan-300">
            {terminalText}
          </pre>
        </div>
        <button
          onClick={() => setGameState('character')}
          className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
        >
          INICIAR DEBUGGING
        </button>
      </div>
    </div>
  );

  // Hacer este juego fue la parte fácil, lo difícil es poner en palabras lo mucho que significas para mí

  const CharacterScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-pink-950"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-black/90 border-2 border-purple-500 rounded-lg p-8 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]">
            CONFIRMA IDENTIDAD
          </h2>
          <p className="text-purple-300 mb-6 text-center text-lg">¿Esta eres tú?</p>
          
          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="w-64 h-64 rounded-lg border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.7)] overflow-hidden bg-gray-900">
              <img 
                src="/dani.jpeg"
                alt="Daniela" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => confirmIdentity(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            >
              Sí, soy yo
            </button>
            <button
              onClick={() => confirmIdentity(false)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-[0_0_20px_rgba(236,72,153,0.6)]"
            >
              No, no soy yo
            </button>
          </div>

          {catDialogue && (
            <div className="mt-6 bg-purple-900/60 border-2 border-purple-400 rounded-lg p-4 shadow-[0_0_20px_rgba(192,132,252,0.4)]">
              <div className="flex items-center gap-3">
                <Cat className="w-8 h-8 text-purple-300" />
                <p className="text-purple-100">{catDialogue}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Cada bug que resuelves aquí es un "te quiero" disfrazado de código

  const GameScreen = () => {
    const level = levels[currentLevel];
    return (
      <div className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto mb-6">
          <div className="flex justify-between items-center bg-black/90 border-2 border-cyan-500/50 rounded-lg p-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <div className="flex items-center gap-4">
              <Code className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <span className="text-xl font-bold text-cyan-400">Nivel {currentLevel + 1}/4</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <span className="text-xl font-bold text-cyan-400">Score: {score}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 relative">
            {/* Floating Cat */}
            <div className="absolute top-4 right-4 z-20">
              <div className="relative">
                <button
                  onClick={() => setShowCatMenu(!showCatMenu)}
                  className="bg-cyan-500/90 hover:bg-cyan-400 rounded-full p-3 shadow-[0_0_25px_rgba(6,182,212,0.8)] border-2 border-cyan-300 transition-all transform hover:scale-110"
                >
                  <Cat className="w-8 h-8 text-white animate-bounce" />
                </button>
                
                {showCatMenu && (
                  <div className="absolute top-16 right-0 bg-black/95 border-2 border-cyan-400 rounded-lg p-4 w-72 shadow-[0_0_35px_rgba(6,182,212,0.6)]">
                    <h3 className="text-cyan-300 font-bold mb-3 flex items-center gap-2">
                      <Cat className="w-5 h-5" />
                      NyanBot.ai
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => showCatInteraction('hello')}
                        className="w-full bg-cyan-600/90 hover:bg-cyan-600 text-white py-2 px-3 rounded text-sm transition shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                      >
                        Hola psps
                      </button>
                      <button
                        onClick={() => showCatInteraction('help')}
                        className="w-full bg-cyan-700/90 hover:bg-cyan-700 text-white py-2 px-3 rounded text-sm transition shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                      >
                        Me ayudas porfa? No sé que hacer
                      </button>
                    </div>
                  </div>
                )}

                {showHelpOffer && (
                  <div className="absolute top-16 right-0 bg-black/95 border-2 border-yellow-400 rounded-lg p-4 w-72 shadow-[0_0_35px_rgba(250,204,21,0.6)]">
                    <div className="flex items-start gap-2 mb-3">
                      <Cat className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <p className="text-yellow-200 text-sm">¿Necesitas ayuda? (･ω･)?</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleHelpResponse(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-3 rounded text-sm transition shadow-[0_0_10px_rgba(8,145,178,0.5)]"
                      >
                        Si porfa ayudame!
                      </button>
                      <button
                        onClick={() => handleHelpResponse(false)}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm transition"
                      >
                        No, muchas gracias gatito
                      </button>
                    </div>
                  </div>
                )}

                {catDialogue && !showHelpOffer && (
                  <div className="absolute top-16 right-0 bg-cyan-900/95 border-2 border-cyan-400 rounded-lg p-4 w-80 shadow-[0_0_35px_rgba(6,182,212,0.6)]">
                    <button
                      onClick={() => setCatDialogue(null)}
                      className="absolute top-2 right-2 text-cyan-300 hover:text-white text-xl"
                    >
                      ×
                    </button>
                    <div className="flex items-start gap-2">
                      <Cat className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <p className="text-cyan-100 text-sm">{catDialogue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/90 border-2 border-cyan-500/50 rounded-lg p-6 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                <Terminal className="w-6 h-6" />
                {level.title}
              </h2>
              <pre className="bg-gray-950 p-4 rounded border border-cyan-500/30 overflow-x-auto shadow-inner">
                <code className="text-cyan-400 text-sm font-mono">
                  {level.code.split('\n').map((line, i) => (
                    <div key={i}>
                      <span className="text-gray-600 mr-4 select-none">{i + 1}</span>
                      {line}
                    </div>
                  ))}
                </code>
              </pre>

              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Escribe tu solución aquí..."
                  className="w-full bg-gray-950 border-2 border-cyan-500/50 rounded px-4 py-3 text-cyan-300 placeholder-cyan-900/50 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  APLICAR FIX Y COMPILAR
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/90 border-2 border-cyan-500/50 rounded-lg p-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <h3 className="text-lg font-bold text-cyan-300 mb-3 drop-shadow-[0_0_10px_rgba(103,232,249,0.6)]">Progreso</h3>
              <div className="space-y-2">
                {levels.map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${i < currentLevel ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : i === currentLevel ? 'bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]' : 'bg-gray-700'}`} />
                    <span className={`text-sm ${i <= currentLevel ? 'text-cyan-300' : 'text-gray-600'}`}>
                      Bug #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {score > 0 && (
          <div className="relative z-10 max-w-6xl mx-auto mt-6">
            <div className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-lg p-6 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              <Heart className="w-8 h-8 text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <p className="text-lg text-cyan-200">{levels[currentLevel - 1]?.message || levels[currentLevel].message}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Eres el mejor "bug" que nunca quiero arreglar en mi vida <3

  const FinaleScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl text-center">
        <Sparkles className="w-32 h-32 mx-auto mb-6 text-cyan-400 animate-pulse drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]" />
        <h1 className="text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
          ¡SISTEMA DEBUGGEADO!
        </h1>
        <div className="bg-black/90 border-2 border-cyan-500/50 rounded-lg p-8 mb-8 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">Score Final: {score}/100</h2>
          <p className="text-2xl text-cyan-300 mb-6 drop-shadow-[0_0_10px_rgba(103,232,249,0.6)]">
            Feliz Cumpleaños Daniela
          </p>
          
          <div className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-lg p-6 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <p className="text-lg text-cyan-100 leading-relaxed whitespace-pre-line">
              Hola mi amor!! Feliz cumpleaños preciosa preciosa.
Has visto que inteligente eres?

Bueno, sé que esto ni se acerca a las piscinas ni a tus examenes para entrar a la uni, pero aunque me haya ayudado una IA me ha costado lo suyo.

Quiero que sepas que a pesar de todas las adversidades, todos nuestros problemas, te quiero muchisimo muchisimo.
Quiero que seas feliz.
Es verdad que este año no podré ni acercarme a lo que hice el anterior año, pero espero que al menos te guste un chilindrín.
Me encantan los momentos que compartimos de intimidad super grande. No me refiero a darnos. Me refiero a intercambiar secretos, decirnos cosas que nos dan vergu, mandarte tiktoks, decirte que he pensado en ti.. Esas cosas cursis. Fue ayer pero me encantó que bailasemos en la calle con musica. Ese tipo de momentos me encantan compartirlos contigo.
Eres la mejor.

Pd: escribí este mensaje muchas veces porque no me terminaba gustando (spoiler: sigue sin gustarme)

FELICES 19 PRECIOSAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Cat className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            <p className="text-cyan-300 italic">¡Misión completada con éxito! (=^･ω･^=)</p>
          </div>
          
          <p className="text-2xl text-cyan-400 font-bold mt-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Con todo mi amor,
          </p>
          <p className="text-cyan-300 mt-2 text-xl drop-shadow-[0_0_10px_rgba(103,232,249,0.6)]">Tu novia no novia - Sandra</p>
        </div>

        <button
          onClick={() => {
            setGameState('intro');
            setCurrentLevel(0);
            setScore(0);
            setUserInput('');
            setAttempts(0);
            setCatDialogue(null);
          }}
          className="bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        >
          Jugar de Nuevo
        </button>
      </div>
    </div>
  );

  // return true; porque tú siempre serás mi respuesta correcta

  return (
    <div className="font-sans">
      {gameState === 'intro' && <IntroScreen />}
      {gameState === 'character' && <CharacterScreen />}
      {gameState === 'playing' && <GameScreen />}
      {gameState === 'finale' && <FinaleScreen />}
    </div>
  );
};

export default DebugMyHeartGame;