import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ProjectSchema } from '../models/Project.js';
import { SprintSchema } from '../models/Sprint.js';
import { TaskSchema } from '../models/Task.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
  Tasks = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
