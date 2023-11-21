import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  //username: studentProject
//password etJ9S5QdjkNvWizT
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

main()
  .then(() => {
    console.log('successfully connected');
  })
  .catch((error) => {
    console.log(error);
  });
