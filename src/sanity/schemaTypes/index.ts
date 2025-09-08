import { type SchemaTypeDefinition } from 'sanity'
import hero from '../../lib/schemas/hero'
import skills from '../../lib/schemas/skills'
import projects from '../../lib/schemas/projects'
import about from '../../lib/schemas/about'
import post from '../../lib/schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, skills, projects, about, post],
}
