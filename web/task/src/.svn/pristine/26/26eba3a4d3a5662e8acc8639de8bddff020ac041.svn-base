<template>
  <div class="document-tree">
    <div class="row" style="margin-top: 4px; ">
      <div class="col-8">
        <el-input placeholder="Tìm kiếm" v-model="filterText">
        </el-input>
      </div>
      <div class="col-auto">
        <span v-if="!isExpanded" class="btn-link" @click="expandAll"><i style="font-size: 17px !important;" class="el-tree-node__expand-icon el-icon-caret-right"></i>Mở rộng</span>
        <span v-else class="btn-link" @click="collapseAll"><i style="font-size: 17px !important;" class="el-tree-node__expand-icon el-icon-caret-right expanded"></i>Thu gọn</span>
      </div>
    </div>
    <el-tree :data="source"
             show-checkbox
             ref="tree"
             node-key="value"
             @node-click="handleNodeClick"
             @check-change="handleCheckChange"
             :default-expand-all="(!$isMobileDevice || $isMobile.iPad()) ? true : false"
             check-strictly 
             highlight-current
             :expand-on-click-node="false"
             :filter-node-method="filterNode"
             :render-content="renderContent">
    </el-tree>

  </div>
</template>
<script>
export default {
  props: ["datasource"],
  data() {
    return {
      source: [],
      isExpanded: false,
      defaultProps: {
        children: "children",
        label: "label",
        type: "type"
      },
      filterText: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    datasource(newVal) {
      this.source = newVal;
    }
  },
  methods: {
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleNodeClick(data) {
      var lst = this.$refs.tree.getCheckedKeys();
      if (lst.indexOf(data.value) === -1) {
        lst.push(data.value);
        this.$refs.tree.setCheckedKeys(lst);
      } else {
        lst.splice(lst.indexOf(data.value), 1);
        this.$refs.tree.setCheckedKeys(lst);
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      var lst = this.$refs.tree.getCheckedNodes();
      this.$hub.$emit("update-document-list", lst);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    expandAll() {
      this.$refs["tree"].$data.store.defaultExpandAll = true;
      this.source = JSON.parse(JSON.stringify(this.source));
      this.isExpanded = true;
    },
    collapseAll() {
      this.$refs["tree"].$data.store.defaultExpandAll = false;
      this.source = JSON.parse(JSON.stringify(this.source));
      this.isExpanded = false;
    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>
              <i class={node.data.icon} />
              {node.label}
            </span>
          </span>
          <span>
            {this.$Utils.isEmpty(node.data.total)
              ? "(" + node.data.total + ")"
              : ""}
          </span>
        </span>
      );
    }
  },
  created () {
    this.$hub.$on('resetChecked', () => {
      this.resetChecked();
    })
  }
};
</script>
<style scope lang="scss">
  .document-tree {

    .el-tree-node__expand-icon {
      font-size: 24px;
    }

    .el-checkbox {
      margin-bottom: 0px;
    }
  }
</style>
