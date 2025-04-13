

const parseEnv = () => {
    const envs = Object.entries(process.env)
      .filter(([key]) => key.startsWith('MITSO_'))
      .map(([key, value]) => `${key}=${value}`);
  
    console.log(envs.join('; '));
  };
  
  parseEnv();
  