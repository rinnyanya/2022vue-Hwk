export default {
  props:['pages','getProducts'],
    template:`

    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item " :class="{disabled: !pages.has_pre }" 
    @click="getProducts(pages.current_page-1)">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li >
    <li v-for="i in pages.total_pages" :key="i+'page'" 
    :class="{active: i === pages.current_page }" 
    @click.prvent="$emit('changePage',i)"
    class="page-item"><a class="page-link" href="#">{{ i }}</a></li>
    <li class="page-item" :class="{disabled: !pages.has_next }" 
    @click="getProducts(pages.current_page+1)">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
}