<template>
  <div style="padding: 15px; background: #fff;">
    <el-button>Button</el-button>

    <hr>

    <el-button type="primary">Primary</el-button>

    <hr>

    <el-select v-model="selected" multiple placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <hr>

    <el-radio-group v-model="radio">
      <el-radio-button label="A" ></el-radio-button>
      <el-radio-button label="B"></el-radio-button>
      <el-radio-button label="C"></el-radio-button>
    </el-radio-group>

    <hr>

    <el-switch
        v-model="switchVal"
        active-text="Yes"
        inactive-text="No">
    ></el-switch>

    <hr>

    <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start">
        <el-button>top-start</el-button>
    </el-tooltip>

    <hr>

     <el-button type="primary" @click="notify">Click here</el-button>

    <hr>

    <el-rate
        v-model="rateVal"
        :texts="['Rất tệ', 'Tệ', 'Bình thường','Tốt','Rất tốt']"
        show-text
    ></el-rate>

    <hr>

    <el-progress :percentage="70"></el-progress>

    <hr>

    <el-progress :text-inside="true" :stroke-width="15" :percentage="70"></el-progress>

    <hr>

    <el-progress :percentage="100" status="success"></el-progress>

    <hr>
    <el-tag>Tag One</el-tag>
    <el-tag type="success">Tag Two</el-tag>

    <hr>
    <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        :tab-position="top"
    >
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>

    <hr>
    <el-alert
      title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magni!"
      type="success"
      description="Lorem ipsum dolor sit amet."
      show-icon
    >
    </el-alert>

  </div>
</template>

<script>
  export default {
    name: 'demo-element',
    data () {
      return {
        selected: [],
        switchVal: null,
        radio: 'A',
        rateVal: null,
        activeName: 'first',
        options: [
          {label: 'A', value: 'a'},
          {label: 'B', value: 'b'}
        ]
      }
    },
    methods: {
      notify () {
        this.$notify({
          title: 'Success',
          message: 'This is a success message',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped>

</style>
