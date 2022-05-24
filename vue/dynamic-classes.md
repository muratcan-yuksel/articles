## object syntax

- we can give more than one dynamic class as you can see

```
<li v-for "(item, index) in items" :key="index"
@click="handleClick(item)"
:class="{className: item.condition, anotherClassName:item.anotherCondition} "
>
  {{ item }}
</li>
```

## array syntax (with static classes)

```
<li v-for "(item, index) in items" :key="index"
@click="handleClick(item)"
:class="['className', 'anotherClassName'] "
>
  {{ item }}
</li>
```

## array syntax (with dynamic classes)

- we use object literals
- we can add another class for false condition too
  ```
  <li v-for "(item, index) in items" :key="index"
  @click="handleClick(item)"
  :class="[item.condition ? 'className' : 'anotherClassForWhenItsFalse',
  item.anotherCondition ? 'anotherClassName' : ''] "
  >
  {{ item }}
  </li>
  ```

## we can combine the two if we wanted to

```
<li v-for "(item, index) in items" :key="index"
@click="handleClick(item)"
:class="[
    {className: item.condition},
     {anotherClassName:item.anotherCondition},
     'static-class'
] "
>
  {{ item }}
</li>
```
