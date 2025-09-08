import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('Portfolio')
    .items([
      S.documentTypeListItem('hero').title('Hero Section'),
      S.documentTypeListItem('about').title('About Section'),
      S.documentTypeListItem('skillCategory').title('Skills'),
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      S.documentTypeListItem('post').title('Blog Posts'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId() &&
          !['hero', 'about', 'skillCategory', 'project', 'post'].includes(item.getId()!)
      ),
    ])
