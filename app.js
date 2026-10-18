(() => {
  'use strict';
  let filter = 'all';
  const papers = window.PUBLICATIONS || [];
  const paperList = document.getElementById('publication-list');
  const search = document.getElementById('paper-search');
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const scholarURL = paper => paper.scholar
    ? 'https://scholar.google.com.hk/citations?view_op=view_citation&user=3ZhIpB0AAAAJ&citation_for_view=3ZhIpB0AAAAJ:' + encodeURIComponent(paper.scholar)
    : 'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + paper.title + '"');
  const link = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  const isAdvisorFirstSecond = paper => paper.advisorFirst && paper.second;
  const isLead = paper => paper.first || isAdvisorFirstSecond(paper);
  const groups = [
    {id: 'lead', title: 'First-author & Advisor-led Second-author Papers', includes: isLead},
    {id: 'coauthored', title: 'Co-authored Publications', includes: paper => !isLead(paper)}
  ];
  function renderPapers() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = papers.filter(paper =>
      (filter === 'all' || filter === 'lead' && isLead(paper) || filter === 'coauthored' && !isLead(paper) || filter === paper.status) &&
      (!query || [paper.title, paper.authors, paper.venue, paper.publication, paper.year, paper.id].join(' ').toLocaleLowerCase().includes(query))
    );
    paperList.innerHTML = groups.map(group => {
      const groupPapers = matches.filter(group.includes).sort((a, b) => b.year - a.year);
      if (!groupPapers.length) return '';
      let lastYear;
      const articles = groupPapers.map(paper => {
      const yearHeading = lastYear !== paper.year ? `<h4 class="year-heading">${paper.year}</h4>` : '';
      lastYear = paper.year;
      const authors = paper.authors.split(', ').map(author => !paper.ambiguousAuthors && ['Yu Wang', 'Y Wang'].includes(author) ? `<strong>${escape(author)}</strong>` : escape(author)).join(', ');
      const titleURL = paper.paper || scholarURL(paper);
      return `${yearHeading}<article class="paper ${paper.status}" id="paper-${paper.id}">
        <div class="paper-venue"><span class="venue-badge">${escape(paper.venue)}</span><span class="paper-year">${paper.year}</span></div>
        <div><h5 class="paper-title">${link(titleURL, escape(paper.title))}</h5><p class="authors">${authors}</p>
          <p class="publication-venue">${escape(paper.publication)} · ${paper.year}</p>
          <div class="paper-links">${paper.paper ? link(paper.paper, 'Paper ↗') : ''}
            ${paper.code ? link(paper.code, 'Code ↗') : ''}
            ${link(scholarURL(paper), 'Scholar ↗')}
            ${paper.first ? '<span class="first-label">FIRST AUTHOR</span>' : isAdvisorFirstSecond(paper) ? '<span class="first-label">SECOND AUTHOR · ADVISOR FIRST</span>' : ''}
          </div>
        </div></article>`;
      }).join('');
      return `<div class="publication-group" id="group-${group.id}" aria-labelledby="heading-${group.id}"><h3 class="publication-group-heading" id="heading-${group.id}">${group.title}<span>${groupPapers.length} ${groupPapers.length === 1 ? 'work' : 'works'}</span></h3>${articles}</div>`;
    }).join('') || '<p class="empty-state">No matching papers. Try another keyword or filter.</p>';
    document.getElementById('result-count').textContent = `Showing ${matches.length} of ${papers.length} works`;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderPapers();
  }));
  search.addEventListener('input', renderPapers);
  const navLinks = [...document.querySelectorAll('nav a')];
  function updateNav() {
    let current = 'about';
    document.querySelectorAll('main section').forEach(section => { if (section.getBoundingClientRect().top <= 150) current = section.id; });
    navLinks.forEach(a => {
      const active = a.hash === '#' + current;
      a.classList.toggle('current', active);
      if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { updateNav(); ticking = false; }); ticking = true; } }, {passive:true});
  renderPapers();
  updateNav();
})();
