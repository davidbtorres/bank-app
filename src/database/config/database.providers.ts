import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

/**
 * Database provider
 *
 * contains database factory provider
 * we use TypeOrmModule here and add connection
 */
// forRootAsync mostly needed when when fetching data externally
export const DatabaseProvider = TypeOrmModule.forRootAsync({
  useFactory: () => config,
});
