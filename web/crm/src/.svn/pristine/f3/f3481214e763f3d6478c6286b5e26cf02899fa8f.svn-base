<template>
  <div class="drag-container">
    <ul class="drag-list">
      <li v-for="(stage, index) in stages" class="drag-column" :class="{['drag-column-' + stage]: true}">
        <span class="drag-column-header" v-bind:style="stage.StyleObject">
          <h2>{{ stage.Name }} ({{ getBlocks(stage.id).length}})</h2>
          <div class="rightaligndiv" v-if="$isMobileDevice">
            <i v-show="stage.show" @click="CollapseExpand(index)" class="fa fa-chevron-down"></i>
            <i v-show="!stage.show" @click="CollapseExpand(index)" class="fa fa-chevron-right"></i>
          </div>
        </span>
        <div class="drag-options"></div>
        <ul class="drag-inner-list" ref="list" :data-status="stage.id" v-show="stage.show">
          <li class="drag-item" v-for="block in getBlocks(stage.id)" :data-block-id="block.id" :key="block.id">
            <slot :name="block.id">
              <strong>{{ block.status }}</strong>
              <div>{{ block.id }}</div>
            </slot>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import dragula from 'dragula';

  export default {
    name: 'KanbanBoard',

    props: {
      stages: {},
      blocks: {},
      isDragable: {}
    },

    computed: {
      localBlocks() {
        return this.blocks;
      },
    },

    methods: {
      getBlocks(status) {
        return this.localBlocks.filter(block => block.status === status);
      },
      CollapseExpand(key) {
        this.stages[key].show = !this.stages[key].show;
      }
    },

    mounted() {
      if (this.isDragable)
        dragula(this.$refs.list)
          .on('drag', (el) => {
            el.classList.add('is-moving');
          })
          .on('drop', (block, list) => {
            this.$emit('update-block', block.dataset.blockId, list.dataset.status);
          })
          .on('dragend', (el) => {
            el.classList.remove('is-moving');

            window.setTimeout(() => {
              el.classList.add('is-moved');
              window.setTimeout(() => {
                el.classList.remove('is-moved');
              }, 600);
            }, 100);
          });
    },
  };
</script>
<style lang="scss" scoped>
  .rightaligndiv {
    text-align: right;
    padding-right: 5px;
  }
</style>
